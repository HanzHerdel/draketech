import ProductModel from "../models/Product.model.js";
import asyncHandler from "express-async-handler";
import express from "express";
const getProducts = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const products = await ProductModel.find({}); //.select('title','creation_time','content','category');;
    return responseValid(response, products);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

const createProduct = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const product = await ProductModel.create(request.body);    
    return responseValid(response, product);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
const updateByID = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const updatedDoc = await ProductModel.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    
    return responseValid(response, updatedDoc);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

const deleteByID = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    await ProductModel.findByIdAndDelete(
      request.params.id,
      request.body
    );
    return responseValid(response);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

function responseValid(
  response: express.Response,
  data = {},
  message = "Success!",
  code = 200
) {
  return response.status(code).send({ valid: true, message, data });
}

export { getProducts, createProduct, updateByID, deleteByID };
