import prisma from "../prisma/prismaClient.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, res) => {
    console.log("in sendVerificationEMail function")
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

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

    console.log("email sent to ", email)
    return res.status(200).send({ message: "Verification email sent" });
  } catch (error) {
    console.log("error sending verification email: ", error);
    return res
      .status(400)
      .send({ message: "Error sending verification email" });
  }
};

export async function signin(req, res) {
  const { email, password } = req.body;

  console.log(email, "tried to signin");

  // empty fields
  if (!email || !password || email === "" || password === "")
    return res.status(400).send({ message: "Invalid email or password" });
  // check if already exist
  const existingUser = await prisma.developer.findUnique({
    where: {
      email: email,
    },
  });
  if (existingUser)
    return res.status(409).send({ message: "User already exists" });

  // Save new user to the database
  const newUser = await prisma.developer.create({
    data: {
      email: email,
      password: password,
    },
  });

  sendVerificationEmail(email, res);

  //   return res.status(201).send({ message: "User created successfully", user: newUser });
}

export async function verifyEmail(req, res) {
  const { token } = req.body;

    console.log("token: ", token)

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Decode the token
    const email = decoded.email;

    console.log(email, "is verifying")

    const user = await prisma.developer.findUnique({
        where: { email: email },
        select: {
            email: true,
            emailVerified: true,
        },
    });

    if(!user)   return res.status(404).send("User not found")

    // Mark the user as verified
    await prisma.developer.update({
        where: { email: email },
        data: { emailVerified: true },
    });

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res
        .status(400)
        .json({
          message: "Verification link expired. Please request a new one.",
        });
    } else {
      res.status(400).json({ message: "Invalid token." });
    }
  }
}

export async function resendVerificationEMail(){
    const { email } = req.body;

    const user = await prisma.developer.findUnique({
        where: { email: email },
        select: {
            email: true,
            emailVerified: true,
        },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    sendVerificationEmail(email, res)
}

export async function login(req, res) {
  // first authenticate email and password
  const { email, password } = req.body;
  console.log("email:", email);
  console.log("password:", password);
  if (!email || !password)
    res.status(401).send({ message: "Invalid credentials" });
  // user-data from client
  const user = {
    email,
    password,
  };
  // userdata from db
  const dbuser = await prisma.developer.findUnique({
    where: {
      email: email,
    },
  });

  console.log(user.email, "tried to login");

  if (dbuser === null)
    return res.status(404).send({ message: "No such user exist" });
  if (user.password !== dbuser.password)
    return res.status(400).send({ message: "Invalid password" });
  if (!dbuser.emailVerified)
    return res.status(401).send({message:"Please verify your email"})

  // generating access token
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return res
    .cookie("token", accessToken, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Prevent CSRF
    })
    .json({ message: "Token assigned" });
}
