import {
  getPosts,
  createPost,
  updateByID,
  deleteByID,
} from "../controllers/postsController.js";
import express from "express";

const router = express.Router();

router.route("/").post(createPost);
router.route("/").get(getPosts);
router.route("/:id").put(updateByID);
router.route("/:id").delete(deleteByID);

export default router;
