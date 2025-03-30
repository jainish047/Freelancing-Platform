import prisma from "../prisma/prismaClient.js";

export async function fetchLists(req, res) {
  try {
    const { id } = req.user;
    const lists = await prisma.list.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Newest first
    });
    res.status(200).json({ lists });
  } catch (error) {
    console.log("error getting lists in backend", error);
    return res.send({ message: "error getting lists in backend" });
  }
}

export async function fetchItems(req, res) {
  try {
    const { listId } = req.params;
    const { id } = req.user;

    // Validate listId
    if (!listId) {
      return res.status(400).json({ error: "List ID is required" });
    }

    let items = [];

    if (listId == "like") {
      items = await prisma.like.findMany({
        where: { userId: id },
        include: { project: true },
        orderBy: { createdAt: "desc" },
      });
    } else if (listId == "bookmark") {
      items = await prisma.bookmark.findMany({
        where: { userId: id },
        include: { project: true },
        orderBy: { createdAt: "desc" },
      });
    } else {
      // Fetch all items in the list
      items = await prisma.listItem.findMany({
        where: { listId },
        include: {
          project: true, // Include project details
        },
        orderBy: { createdAt: "desc" }, // Newest first
      });
    }

    res.status(200).json({ items: items || [] });
  } catch (error) {
    console.log("error getting items in backend", error);
    return res.status(500).send({ message: "error getting items in backend" });
  }
}

export async function createNewList(req, res) {
  try {
    const { name, type } = req.body;
    const { id: userId } = req.user;

    // Validate input
    if (!name || !type) {
      return res.status(400).json({ error: "Name and type are required" });
    }

    // Optionally, you can validate the `type` against allowed enum values.
    // For example, if your enum ListType has PROJECT and USER:
    const validTypes = ["PROJECT", "USER"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid list type provided" });
    }

    // Create a new list associated with the user
    const newList = await prisma.list.create({
      data: {
        name,
        type,
        userId,
      },
    });

    const lists = await prisma.list.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Newest first
    });

    res.status(201).json({ lists });
  } catch (error) {
    console.log("error creating new list in backend", error);
    return res.send({ message: "error creating new list in backend" });
  }
}

export async function addToList(req, res) {
  try {
    const { listId, type, entityId } = req.body;
    const { id: userId } = req.user;

    // Validate required inputs
    if (!listId || !entityId) {
      return res
        .status(400)
        .json({ error: "List ID and entityId are required." });
    }

    let newItem;

    // Handle special like and bookmark lists
    if (listId === "like") {
      // Create a like record (assuming only projects are liked)
      newItem = await prisma.like.create({
        data: {
          userId,
          projectId: entityId,
        },
      });
      // Return all like items for the user
      const items = await prisma.like.findMany({
        where: { userId },
        include: { project: true },
        orderBy: { createdAt: "desc" },
      });
      return res.status(201).json({ items });
    } else if (listId === "bookmark") {
      // Create a bookmark record (assuming only projects are bookmarked)
      newItem = await prisma.bookmark.create({
        data: {
          userId,
          projectId: entityId,
        },
      });
      // Return all bookmark items for the user
      const items = await prisma.bookmark.findMany({
        where: { userId },
        include: { project: true },
        orderBy: { createdAt: "desc" },
      });
      return res.status(201).json({ items });
    } else {
      // For regular lists, ensure the list exists and belongs to the user
      const list = await prisma.list.findUnique({
        where: { id: listId },
      });

      if (!list) {
        return res.status(404).json({ error: "List not found." });
      }

      if (list.userId !== userId) {
        return res.status(403).json({
          error: "You are not authorized to add items to this list.",
        });
      }

      // Prepare data for the new list item based on type.
      let data = { listId };

      if (type === "PROJECT") {
        data.projectId = entityId;
      } else if (type === "USER") {
        data.userId = entityId;
      } else {
        return res
          .status(400)
          .json({ error: "Invalid type. Must be 'PROJECT' or 'USER'." });
      }

      // Create the list item
      newItem = await prisma.listItem.create({ data });

      // Return all items in this list, including associated project or user details
      const items = await prisma.listItem.findMany({
        where: { listId },
        include: {
          project: true,
          user: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return res.status(201).json({ items });
    }
  } catch (error) {
    console.log("error adding to list in backend", error);
    return res.send({ message: "error adding to list in backend" });
  }
}

export async function removeItemFromList(req, res) {
  try {
    const { listId, type, entityId } = req.body;
    const { id: userId } = req.user;

    // Validate required inputs
    if (!listId || !entityId) {
      return res
        .status(400)
        .json({ error: "List ID and entityId are required." });
    }

    let deletedResult;
    let items;

    if (listId === "like") {
      // Delete from 'like' table (assuming entityId is projectId)
      deletedResult = await prisma.like.deleteMany({
        where: {
          userId,
          projectId: entityId,
        },
      });
      // Fetch updated likes for the user
      items = await prisma.like.findMany({
        where: { userId },
        include: { project: true },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ items });
    } else if (listId === "bookmark") {
      // Delete from 'bookmark' table (assuming entityId is projectId)
      deletedResult = await prisma.bookmark.deleteMany({
        where: {
          userId,
          projectId: entityId,
        },
      });
      // Fetch updated bookmarks for the user
      items = await prisma.bookmark.findMany({
        where: { userId },
        include: { project: true },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ items });
    } else {
      // For regular lists, first verify list ownership
      const list = await prisma.list.findUnique({
        where: { id: listId },
      });

      if (!list) {
        return res.status(404).json({ error: "List not found." });
      }

      if (list.userId !== userId) {
        return res
          .status(403)
          .json({ error: "You are not authorized to modify this list." });
      }

      // Build condition based on the provided type
      let whereClause;
      if (type === "PROJECT") {
        whereClause = { listId, projectId: entityId };
      } else if (type === "USER") {
        whereClause = { listId, userId: entityId };
      } else {
        return res
          .status(400)
          .json({ error: "Invalid type. Must be 'PROJECT' or 'USER'." });
      }

      // Delete the list item
      deletedResult = await prisma.listItem.deleteMany({
        where: whereClause,
      });

      // Fetch updated list items (including associated project or user details)
      items = await prisma.listItem.findMany({
        where: { listId },
        include: {
          project: true,
          user: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ items });
    }
  } catch (error) {
    console.log("error removing item", error);
    return res.status(500).send({ message: "error removing item" });
  }
}

export async function deleteList(req, res) {
  try {
    const { listId } = req.params;
    const { id: userId } = req.user;

    // Prevent deletion of "like" or "bookmark" lists
    if (listId === "like" || listId === "bookmark") {
      return res.status(400).json({
        error: "Special lists like 'like' and 'bookmark' cannot be deleted.",
      });
    }

    // Find the list to ensure it exists and belongs to the user
    const list = await prisma.list.findUnique({
      where: { id: listId },
    });

    if (!list) {
      return res.status(404).json({ error: "List not found." });
    }

    if (list.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this list." });
    }

    // Delete the list
    await prisma.list.delete({
      where: { id: listId },
    });

    return res.status(200).json({ message: "List deleted successfully." });
  } catch (error) {
    console.log("error deleting list", error);
    return res.status(500).send({ message: "error deleting list" });
  }
}
