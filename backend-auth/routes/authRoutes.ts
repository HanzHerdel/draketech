import { registerUser, obtainToken, validateToken, deleteToken } from "../controllers/authController.js";
import { Router} from "express";



const injectedApp = (router:Router) => {
  router.post("/user/create", registerUser);
  router.post("/user/token", obtainToken);
  router.get("/user/validate", validateToken);
  router.delete("/user/token", deleteToken);
  return router;
};
export default injectedApp;
