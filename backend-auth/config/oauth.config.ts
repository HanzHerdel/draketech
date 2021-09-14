
import OAuthserver from "oauth2-server";
import oauthModel from "../models/oauthModelRedis.model.js";

const oauth = new OAuthserver({
    model: oauthModel,
    requireClientAuthentication: { password: false },
  });

export default oauth