/************************************************************************
 * IMPORTS
 ************************************************************************/
import { BinaryLike } from "crypto";
import { Client, User } from "oauth2-server";
import redisClient from "../config/redisClient.config.js";
import { getCacheJSON, setCacheJSON } from "../utils/redis.js";
import { decodeJWT, simpleHash } from "../utils/utils.js";
import UserModel from "./user.js";
import jwt from "jsonwebtoken";
/************************************************************************
 * VARIABLES
 ************************************************************************/

const seconds = 60;
const minutesAccessToken = 10;
const minutesRefreshToken = 1;
const AUTH_SECRET = process.env.AUTH_SECRET ?? "secretKey";
/************************************************************************
 * SERVICES
 ************************************************************************/

/*
 * Methods used by all grant types.
 */
const getAccessToken = async function (accessToken: any) {
  const values: any = await decodeJWT(accessToken);
  const key: string = values?.userId ?? null;
  if (!key) return false;
  //obtener token de acceso de acuerdo al access_token ingresado
  const token = await getTokenRedis(`T${key}`);
  //retornar token de acceso
  return token;
};

var getClient = async (clientID = "", clientSecret = "") => {
  //create the the client out of the given params.
  //It has no functional role in grantTypes of type password
  const client = {
    clientID,
    clientSecret,
    grants: ["password"],
    //redirectUris: null,
  };
  return client;
};
/*
 * Method used only by password grant type.
 */

const getUser = async function (
  username: String,
  password: BinaryLike,
  callback: any
) {
  const passwordHash = simpleHash(password);
  try {
    const user = await UserModel.findOne({
      $and: [{ username }, { password: passwordHash }],
    });
    if (!user) {
      return callback(true, {valid:false});
    }
    callback(false, {
      userId: user._id,
      username: user.username,
    });
  } catch (error) {
    console.log("error: ", error);
    return callback(true, {valid:false});
  }
};

function saveToken(token: any, client: any, user: any) {
  token.client = {
    id: client.clientID,
  };

  token.user = {
    id: user.userId,
  };
  const duration = seconds * minutesAccessToken;
  //Guardar token de acceso con el tiempo especificado al momento de crearlo, el nombre del documento es el access_token
  setCacheJSON(redisClient.cache, `T${user.userId}`, token, duration);
  //Guardar token de refrescamiento con el tiempo especificado al momento de crearlo, el nombre del documento es el refresh_token
  setCacheJSON(redisClient.cache, `R${user.userId}`, token, duration * 2);
  //retornar token
  return token;
}

/**
 * Obtener un documento desde redis y realizar las mutaciones a sus objetos
 * @param {*} key
 */
async function getTokenRedis(key: any) {
  //buscar token
  let token = await getCacheJSON(redisClient.cache, key);
  //validar si el token existe, retornar token vacio
  if (!token) return token;
  //transformar fechas a objetos
  token = {
    ...token,
    accessTokenExpiresAt: new Date(token.accessTokenExpiresAt),
    refreshTokenExpiresAt: new Date(token.refreshTokenExpiresAt),
  };
  return token;
}
async function generateAccessToken(client: Client, user: User, scope: String) {
  const jwtAccess = jwt.sign(user, AUTH_SECRET);
  return jwtAccess;
}

//TODO not implemented
var getRefreshToken = async function (refreshToken: string) {
  //obtener token de refrescamiento de acuerdo al refresh_token ingresado
  return false;
};
/**
 * Export model definition object.
 */
const model: any = {
  getAccessToken: getAccessToken,
  getClient: getClient,
  saveToken: saveToken,
  getUser: getUser,
  generateAccessToken: generateAccessToken,
};
export default model;
