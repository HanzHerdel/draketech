import BlogEntry from "../models/post.js";
import asyncHandler from "express-async-handler";

const getPosts = asyncHandler(async (request, response) => {
  try {
    const post = await BlogEntry.find({}); //.select('title','creation_time','content','category');;
    response.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

const createPost = asyncHandler(async (request, response) => {
  try {
    const entry = await BlogEntry.create(request.body);
    response.json(entry);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});
const updateByID = asyncHandler(async (request, response) => {
  try {
    const updatedDoc = await BlogEntry.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    response.json(updatedDoc);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

const deleteByID = asyncHandler(async (request, response) => {
  try {
    const updatedDoc = await BlogEntry.findByIdAndDelete(
      request.params.id,
      request.body
    );
    response.json(updatedDoc);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

export { getPosts, createPost, updateByID, deleteByID };
