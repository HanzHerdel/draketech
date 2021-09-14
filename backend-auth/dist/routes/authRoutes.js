import { registerUser, obtainToken } from "../controllers/authController.js";
//import modelOauth from "../controllers/modelOauth";
//import oauthController from "../controllers/oauth.controller";
/**
 * Importar controladores para autorización y verificación de permisos
 */
const injectedApp = (oauth, router) => {
    router.post("/user/create", registerUser);
    router.all("/register" /*registerUser*/);
    router.get("/oauth/dump" /*modelOauth.dumpMemory*/);
    //Ruta Para Token con acciones
    router.post("/user/token", (req, res) => obtainToken(req, res, oauth));
    router.get("/user/validate" /*oauthController.validateRequest*/);
    router.delete("/user/token" /*oauthController.dumpMemory*/);
    return router;
};
export default injectedApp;
