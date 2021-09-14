import UserModel from "../models/user.js";
import { decodeJWT, responseValid, simpleHash } from "../utils/utils.js";
import OAuth2Server from "oauth2-server";
import express from "express";
import oauthClient from "../config/oauth.config.js";
import mongoose from "mongoose";
import redisClient from "../config/redisClient.config.js";
import { deleteCache } from "../utils/redis.js";
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

/**delete existing token from redis client*/
const deleteToken = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const token = request.headers.authorization?.split(" ")[1] ?? "";
    const value: any = await decodeJWT(token);
    if (!value?.userId) return response.status(500).json("token not found");
    await deleteCache(redisClient.cache, `T${value.userId}`);
    return responseValid(response)
  } catch (error) {
    console.log("error delete: ", error);
    response.status(500).json(error);
  }
};

/** create token and save it on redis client, the request must contain username and password */
const obtainToken = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    var oauthReq = new Request(request);
    var oauthRes = new Response(response);
    let token = await oauthClient.token(oauthReq, oauthRes);
    
    return responseValid(response,{ accessToken: token.accessToken })
  } catch (error) {
    console.log("error obtain: ", error);
    response.status(500).json(error);
  }
};

/**validate if token exist and */
const validateToken = async (req: express.Request, res: express.Response) => {
  try {
    //Definir un nuevo request y un nuevo response
    const oauthReq = new Request(req);
    const oauthRes = new Response(res);
    //Recuperar Token generado
    const token = await oauthClient.authenticate(oauthReq, oauthRes);
    //security extra layer 
    const client = await UserModel.findById(
      mongoose.Types.ObjectId(token.user.id)
    );
    if(!client) return res.status(401).send("client error");
    return responseValid(res)
  } catch (error) {
    console.log(error);
    //si el token no es valido, retornar codigo de estado de error
    res.status(500).send(error);
  }
};

const registerUser = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const password = simpleHash(request.body.password);
    const newUser = await UserModel.create({
      username: request.body.username,
      password,
    });
    return responseValid(response)
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};



export { registerUser, obtainToken, validateToken, deleteToken };

