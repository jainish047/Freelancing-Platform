import prisma from "../prisma/prismaClient.js";

async function filterProjects(req, res) {
  try {
    const {
      q,
      status,
      budget,
      skills,
      projectLocation,
      clientCountries,
      languages,
      sortBy,
      page = 1,
      pageSize = 10,
    } = req.query;

    const filters = {};

    // Search by title or description (case-insensitive)
    if (q) {
      filters.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    // Filter by status
    if (status) {
      filters.status = status;
    }

    // Filter by budget range
    const min = Number(budget?.split("-")[0]);
    const max = Number(budget?.split("-")[1]);
    if (min && max && min <= max) {
      filters.AND = [];
      if (min) {
        filters.AND.push({ minBudget: { gte: min } });
      }
      if (max) {
        filters.AND.push({ maxBudget: { lte: max } });
      }
    }

    // Filter by required skills
    if (skills?.length) {
      filters.skillsRequired = { hasSome: skills };
    }

    // Filter by project location (if applicable in your schema)
    //   if (projectLocation) {
    //     filters.projectLocation = projectLocation;
    //   }

    // Filter by client country
    if (clientCountries?.length) {
      filters.user = { country: { in: clientCountries } };
    }

    // Filter by language (assuming user has a "languages" field)
    if (languages?.length) {
      filters.user = { languages: { hasSome: languages } };
    }

    // Sorting
    let orderBy = {};

    if (sortBy) {
      switch (sortBy) {
        case "oldest":
          orderBy = { createdAt: "asc" }; // Sort by oldest projects
          break;
        case "lowprice":
          orderBy = { minBudget: "asc" }; // Sort by lowest minimum budget
          break;
        case "highprice":
          orderBy = { minBudget: "desc" }; // Sort by highest minimum budget
          break;
        case "lowbids":
          orderBy = { bids: { _count: "asc" } }; // Sort by lowest number of bids
          break;
        case "highbids":
          orderBy = { bids: { _count: "desc" } }; // Sort by highest number of bids
          break;
        default:
          orderBy = { createdAt: "desc" }; // Default: Newest projects first
      }
    } else {
      orderBy = { createdAt: "desc" };
    }

    // Pagination
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Fetch filtered projects
    const projects = await prisma.project.findMany({
      where: filters,
      orderBy,
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          }, // Include client details if needed
        },
      },
    });
    console.log("filtered projects->", projects);
    return res.status(200).send({ message: "filtered projects", projects });
  } catch (error) {
    console.log("error in project filter->", error);
    return res
      .status(400)
      .send({ message: "project filter error from backend" });
  }
}

export { filterProjects };
