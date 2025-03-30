import express from "express";
import { addToList, createNewList, fetchItems, fetchLists } from "../controllers/listsController.js";

const router = express.Router()

router.get("/", fetchLists)

router.get("/:listId", fetchItems)

router.post("create", createNewList)

router.post("add", addToList)



export default router;