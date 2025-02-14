import prisma from "../prisma/prismaClient.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { person, getTable, exist } from "../common/user.js";

const sendVerificationEmail = async (email, role, type, res) => {
  console.log("in sendVerificationEMail function");
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  const token = jwt.sign(
    { email, role, type },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  try {
    await transporter.sendMail({
      from: '"P4" <no-reply@example.com>',
      to: email,
      subject: "Email Verification",
      html: `
            <p>Hello ${email},</p>
            <p>Thank you for registering! Please verify your email by clicking the link below:</p>
            <a href="${verificationUrl}">Verify Email</a>
            <p>${verificationUrl}</p>
            <p>The link will expire in 1 hour.</p>
          `,
    });

    console.log("email sent to ", email);
    return res.status(200).send({ message: "Verification email sent" });
  } catch (error) {
    console.log("error sending verification email: ", error);
    return res
      .status(400)
      .send({ message: "Error sending verification email" });
  }
};

export async function signin(req, res) {
  try{
    console.log(req.body);
  const { email, password, role, type, companyName } = req.body;

  console.log(email, " tried to signin");

  // empty fields
  if (!email || !password || email === "" || password === "")
    return res.status(400).send({ message: "Invalid email or password" });
  if (
    role === person.employer &&
    type === person.type.organization &&
    (!companyName || companyName === "")
  )
    return res.status(400).send({ message: "Invalid Company name" });

  const table = getTable(role, type);
  if (!table) res.status(400).send({ message: "invalid role" });
  // console.log("table->", table)
  // check if user already exist
  const existingUser = await table.findFirst({
    where: {
      OR: [{ email: email }, { companyName: companyName }],
    },
  });
  console.log("existing user:->", existingUser)
  if (existingUser)
    return res
      .status(409)
      .send({ message: "Email/Company name already exists" });

  // Save new user to the database
  let newUser;
  try{
    if(role===person.employer && type===person.type.organization){
      newUser = await table.create({
        data: {
          email: email,
          password: password,
          companyName: companyName,
        },
      });
    }else{
      newUser = await table.create({
        data: {
          email: email,
          password: password,
        },
      });
    }
  }catch(err){
    console.log("error creating user->", err)
  }

  console.log("newUser:->", newUser)

  if (!newUser)
    return res.status(400).send({ message: "User could not be created" });

  sendVerificationEmail(email, role, type, res);
  }catch(error){
    return res.status(400).send({ message: "Something went wrong" });
  }
  //   return res.status(201).send({ message: "User created successfully", user: newUser });
}

export async function verifyEmail(req, res) {
  const { token } = req.body;

  console.log("token: ", token);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Decode the token
    const { email, role, type } = decoded;

    const table = getTable(role, type);
    if (!table) return res.status(400).send({ message: "invalid role" });

    console.log(email, " ", role, " ", type, "is verifying");

    const user = await table.findUnique({
      where: { email: email },
      select: {
        email: true,
        emailVerified: true,
      },
    });
    if (!user) return res.status(404).send("User not found");

    // Mark the user as verified
    await table.update({
      where: { email: email },
      data: { emailVerified: true },
    });

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(400).json({
        message: "Verification link expired. Please request a new one.",
      });
    } else {
      res.status(400).json({ message: "Invalid token." });
    }
  }
}

export async function resendVerificationEMail(req, res) {
  const { email, role, type } = req.body;

  const table = getTable(role, type);
  console.log(table);
  if (!table) return res.status(400).send({ message: "Invalid role" });

  const user = exist(email, table);
  if (user) return res.status(404).send({ message: "User not found" });

  if (user.emailVerified)
    return res.status(400).json({ message: "Email is already verified." });

  sendVerificationEmail(email, res);
}

export async function login(req, res) {
  // first authenticate email and password
  const { email, password, role, type } = req.body;
  console.log("email:", email);
  console.log("password:", password);
  if (!email || !password)
    return res.status(401).send({ message: "Invalid credentials" });

  // user-data from client
  const user = {
    email,
    password,
    role,
    type,
  };

  const table = await getTable(role, type);
  if (!table) return res.status(404).send({ message: "Invalid role" });

  const dbuser = await table.findUnique({
    where: {
      email: email,
    },
  });
  if (!dbuser) return res.status(404).send({ message: "No such user exist" });

  console.log(user.email, "tried to login");

  if (dbuser === null)
    return res.status(404).send({ message: "No such user exist" });
  if (user.password !== dbuser.password)
    return res.status(400).send({ message: "Invalid password" });
  if (!dbuser.emailVerified)
    return res.status(403).send({ message: "Please verify your email" });

  // generating access token
  const accessToken = jwt.sign(
    { email, role, type },
    process.env.ACCESS_TOKEN_SECRET
  );
  return res
    .cookie("token", accessToken, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Prevent CSRF
    })
    .json({ message: "Token assigned" });
}
