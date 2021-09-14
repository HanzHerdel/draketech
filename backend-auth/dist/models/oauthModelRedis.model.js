var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import clientModel from "./client.js";
import oauth from "../config/redisClient.config.js";
import { getCacheJSON, setCacheJSON } from "../utils/redis.js";
import { simpleHash } from "../utils/utils.js";
/************************************************************************
 * VARIABLES
 ************************************************************************/
const seconds = 60;
const minutesAccessToken = 1;
const minutesRefreshToken = 1;
/************************************************************************
 * SERVICES
 ************************************************************************/
/*
 * Methods used by all grant types.
 */
const getAccessToken = function (accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield getTokenRedis(accessToken);
        //retornar token de acceso
        return token;
    });
};
var getClient = (clientID = "", clientSecret = "") => __awaiter(void 0, void 0, void 0, function* () {
    //create the the client out of the given params.
    //It has no functional role in grantTypes of type password
    const client = {
        clientID,
        clientSecret,
        grants: ["password"],
        //redirectUris: null,
    };
    return client;
});
/*
 * Method used only by password grant type.
 */
const getUser = function (username, password, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordHash = simpleHash(password);
        console.log("passwordHash: ", passwordHash);
        try {
            const user = yield clientModel.findOne({
                $and: [{ username }, { password: passwordHash }],
            });
            console.log("user: ", user);
            if (!user) {
                return false;
            }
            callback(false, {
                userId: user._id,
                username: user.username,
            });
        }
        catch (error) {
            console.log("error: ", error);
            return false;
        }
    });
};
function grantTypeAllowed(clientID, grantType, callback) {
    callback(false, true);
}
function saveToken(token, client, user) {
    console.log("user: ", user, user.userId);
    console.log("token***: ", token);
    token.client = {
        id: client.clientID,
    };
    token.user = {
        id: user.userId,
    };
    //Guardar token de acceso con el tiempo especificado al momento de crearlo, el nombre del documento es el access_token
    setCacheJSON(oauth.cache, token.accessToken, token, seconds * minutesAccessToken);
    //Guardar token de refrescamiento con el tiempo especificado al momento de crearlo, el nombre del documento es el refresh_token
    setCacheJSON(oauth.cache, token.refreshToken, token, seconds * minutesRefreshToken);
    //retornar token
    return token;
}
/**
 * Obtener un documento desde redis y realizar las mutaciones a sus objetos
 * @param {*} key
 */
function getTokenRedis(key) {
    return __awaiter(this, void 0, void 0, function* () {
        //buscar token
        let token = yield getCacheJSON(oauth.cache, key);
        //validar si el token existe, retornar token vacio
        if (!token)
            return token;
        //transformar fechas a objetos
        token = Object.assign(Object.assign({}, token), { accessTokenExpiresAt: new Date(token.accessTokenExpiresAt), refreshTokenExpiresAt: new Date(token.refreshTokenExpiresAt) });
        return token;
    });
}
/**
 * Export model definition object.
 */
const model = {
    getAccessToken: getAccessToken,
    getClient: getClient,
    saveToken: saveToken,
    getUser: getUser,
    grantTypeAllowed,
};
export default model;
