import prisma from "../prisma/prismaClient.js";
import { getTable, exist } from "../common/user.js";

async function selfDetails(req, res, next) {
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

export { selfDetails };
