const person = {
  developer: "Developer",
  employer: "Employer",
  type: {
    individual: "Individual",
    organization: "Organization",
  },
};

async function getTable(role, type) {
  if (role === person.developer) {
    return prisma.developer;
  } else if (role === person.employer && type === person.type.individual) {
    return prisma.clientIndividual;
  } else if (role === person.employer && type === person.type.organization) {
    return prisma.clientOrganization;
  }
  return false;
}

async function exist(email, table) {
  return await table.findUnique({
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