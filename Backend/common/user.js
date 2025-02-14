import prisma from "../prisma/prismaClient.js";

const person = {
  developer: "Developer",
  employer: "Employer",
  type: {
    individual: "Individual",
    organization: "Organization",
  },
};

function getTable(role, type) {
  if (role === person.developer) {
    return prisma.developer;
  } else if (role === person.employer && type === person.type.individual) {
    return prisma.clientIndividual;
  } else if (role === person.employer && type === person.type.organization) {
    return prisma.clientOrganization;
  }
  return false;
}

function exist(email, table) {
  return table.findUnique({
    where: { email: email },
    select: {
      email: true,
      emailVerified: true,
    },
  });
}

export {
    person,
    getTable,
    exist
}