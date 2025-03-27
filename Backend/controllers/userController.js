import prisma from "../prisma/prismaClient.js";
import { getTable, exist } from "../common/user.js";

async function selfDetails(req, res) {
  const user = req.user;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if(!existingUser)
    return res.status(404).send({message:"User not found"})

  return res.status(200).send(existingUser)
}

async function updateProfile(res, req) {
  const userId = req.user.id;
  const { name, role, phoneNumber, bio, skills, location, dob, languages } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, role, phoneNumber, bio, skills, location, dob, languages },
    });

    return res.status(200).send({message:"user profile updated", updatedUser});
  } catch (error) {
    return res.status(500).send({ message: "Error updating profile", error });
  }
}

export { selfDetails, updateProfile };
