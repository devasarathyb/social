import express from "express";
import {
    getPosts, addPosts, deletePosts
} from "../controllers/post.js";

const router = express.Router()


router.get("/", getPosts)
router.post("/", addPosts)
router.delete("/:id", deletePosts)

export default router