import ProductModel from "../models/Product.model.js";
import asyncHandler from "express-async-handler";
import express from "express";
const getProducts = async (request:express.Request, response:express.Response) => {
  try {
    const post = await ProductModel.find({}); //.select('title','creation_time','content','category');;
    response.status(200).json(post);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
}

const createProduct = async (request:express.Request, response:express.Response) => {
  try {
    const entry = await ProductModel.create(request.body);
    response.json(entry);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
const updateByID =async  (request:express.Request, response:express.Response) => {
  try {
    const updatedDoc = await ProductModel.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    response.json(updatedDoc);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
}

const deleteByID = async  (request:express.Request, response:express.Response)  => {
  try {
    const updatedDoc = await ProductModel.findByIdAndDelete(
      request.params.id,
      request.body
    );
    response.json(updatedDoc);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
}

export { getProducts, createProduct, updateByID, deleteByID };
