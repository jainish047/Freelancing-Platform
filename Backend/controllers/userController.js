import prisma from "../prisma/prismaClient.js";
import { getTable, exist } from "../common/user.js";

async function selfDetails(req, res) {
  const user = req.user;

  if (!user) return res.status(404).send({ message: "User not found" });

  // const existingUser = await prisma.user.findUnique({
  //   where: {
  //     email: user.email,
  //   },
  // });
  // no need to do this bcz if user exist, jwt strategy has alreacy extracted details

  console.log("existingUser->", user);

  return res.status(200).send(user);
}

async function updateProfile(res, req) {
  const userId = req.user.id;
  const { name, role, phoneNumber, bio, skills, location, dob, languages } =
    req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, role, phoneNumber, bio, skills, location, dob, languages },
    });

    return res
      .status(200)
      .send({ message: "user profile updated", updatedUser });
  } catch (error) {
    return res.status(500).send({ message: "Error updating profile", error });
  }
}

export async function userDetails(req, res) {
  try {
    const userId = req.params.id;

    if (!userId)
      return res.status(400).send({ message: "User id is required" });

    console.log("finding user with id:", userId)

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    console.log("found user:->", user)

    if (!user) return res.status(404).send({ message: "User not found" });

    return res.status(200).send(user);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error fetching user details", error });
  }
}

export { selfDetails, updateProfile };
