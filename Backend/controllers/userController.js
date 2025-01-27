import prisma from "../prisma/prismaClient.js";
import { getTable, exist } from "../common/user.js";

async function selfDetails(req, res, next) {
  const user = req.user;
  const table = getTable(user.role, user.type);
  if (!table) return res.status(400).send({ message: "Invalid role" });

  const existingUser = await table.findUnique({
    where: {
      email: user.email,
    },
  });

  if(!existingUser)
    return res.status(404).send({message:"User not found"})

  return res.status(200).send(existingUser)
}

export { selfDetails };
