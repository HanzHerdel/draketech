var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import clientModel from "../models/client.js";
import { simpleHash } from "../utils/utils.js";
import OAuth2Server from "oauth2-server";
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;
const obtainToken = (request, response, oauth) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Definir un nuevo request y un nuevo response
        var oauthReq = new Request(request);
        var oauthRes = new Response(response);
        let token = yield oauth.token(oauthReq, oauthRes);
        response.status(200).json(token);
    }
    catch (error) {
        console.log("error obtain: ", error);
        response.status(500).json(error);
    }
});
const registerUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = simpleHash(request.body.password);
        const newUser = yield clientModel.create({
            username: request.body.username,
            password,
        });
        response.json(newUser);
    }
    catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});
export { registerUser, obtainToken };
