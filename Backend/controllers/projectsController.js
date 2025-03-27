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
    } = req.query;

    console.log("req query->", req.query);

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
      filters.status = {
        in: status
          .split(",") // Split into an array
          .map((s) => s.trim().toUpperCase()) // Trim spaces & convert to uppercase
          .filter((s) => s !== ""),
      };
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
      filters.skillsRequired = { hasSome: skills.split(",") };
    }

    // Filter by project location (if applicable in your schema)
    //   if (projectLocation) {
    //     filters.projectLocation = projectLocation;
    //   }

    // Filter by client country
    if (clientCountries?.length) {
      filters.user = { country: { in: clientCountries.split(",") } };
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
    const skip = Number(page) * Number(process.env.PROJECTSPERPAGE);
    const take = Number(process.env.PROJECTSPERPAGE);

    // Use prisma.$transaction() to fetch both total count and filtered projects in one query
    const [totalProjects, projects] = await prisma.$transaction([
      prisma.project.count({ where: filters }),
      prisma.project.findMany({
        where: filters,
        orderBy,
        skip,
        take,
        include: {
          user: {
            select: { id: true, name: true },
          },
        },
      }),
    ]);
    // Benefits of Using $transaction():
    // Single database lookup: Runs both queries (count and fetch) in one request, improving efficiency.
    // Consistency: Ensures both queries run with the same filter conditions.
    // Performance boost: Reduces the number of database queries from 2 to 1, reducing latency.

    console.log(`filtered ${totalProjects} projects->`);
    return res
      .status(200)
      .send({
        message: "filtered projects",
        projects,
        totalPages:
          Number(totalProjects) / process.env.PROJECTSPERPAGE +
          (Number(totalProjects) % process.env.PROJECTSPERPAGE !== 0 ? 1 : 0),
      });
  } catch (error) {
    console.log("error in project filter->", error);
    return res
      .status(400)
      .send({ message: "project filter error from backend" });
  }
}

async function getProjectDetails(req, res, next) {
  try {
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
      include: {
        user: true, // Include client details
        bids: true, // Include bids details
        skillsRequired: true, // Include skills required details
      },
    });

    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    return res.status(200).send({ project });
  } catch (error) {
    console.log("error in getProjectDetails->", error);
    return res
      .status(400)
      .send({ message: "Error fetching project details in backend" });
  }
}

async function bidOnProject(req, res, next) {
  try {
    const { projectId } = req.params;
    const { userId } = req.user;
    const { bidAmount } = req.body;

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
    });

    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    // Check if bid amount is within the budget range
    if (bidAmount < project.minBudget || bidAmount > project.maxBudget) {
      return res
        .status(400)
        .send({ message: "Bid amount out of budget range" });
    }

    // Create a new bid
    const bid = await prisma.bid.create({
      data: {
        amount: bidAmount,
        projectId: Number(projectId),
        userId: Number(userId),
      },
    });

    return res.status(201).send({ message: "Bid placed successfully", bid });
  } catch (error) {
    console.log("error in bidOnProject->", error);
    return res.status(400).send({ message: "Error placing bid on project" });
  }
}

async function bookmarkProject(req, res, next) {
  try {
    const { projectId } = req.params;
    const { userId } = req.user;

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
    });

    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    // Add bookmark to the project
    const bookmark = await prisma.bookmark.create({
      data: {
        projectId: Number(projectId),
        userId: Number(userId),
      },
    });

    return res
      .status(201)
      .send({ message: "Project bookmarked successfully", bookmark });
  } catch (error) {
    console.log("error in bookmarkProject->", error);
    return res.status(400).send({ message: "Error bookmarking project" });
  }
}

async function unbookmarkProject(req, res, next) {
  try {
    const { projectId } = req.params;
    const { userId } = req.user;

    // Check if bookmark exists
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        projectId_userId: {
          projectId: Number(projectId),
          userId: Number(userId),
        },
      },
    });

    if (!bookmark) {
      return res.status(404).send({ message: "Bookmark not found" });
    }

    // Remove bookmark from the project
    await prisma.bookmark.delete({
      where: {
        projectId_userId: {
          projectId: Number(projectId),
          userId: Number(userId),
        },
      },
    });

    return res
      .status(200)
      .send({ message: "Project unbookmarked successfully" });
  } catch (error) {
    console.log("error in unbookmarkProject->", error);
    return res.status(400).send({ message: "Error unbookmarking project" });
  }
}

export {
  filterProjects,
  getProjectDetails,
  bidOnProject,
  bookmarkProject,
  unbookmarkProject,
};
