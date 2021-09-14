import {
  getProducts,
  createProduct,
  updateByID,
  deleteByID,
} from "../controllers/productsController.js";
import  express  from "express";
import { validateToken } from "../utils/validationToken.js";

const router: express.Router = express.Router();

router.route("/").get(getProducts);
/**Protected routes */
router.route("/").post(validateToken, createProduct);
router.route("/:id").patch(validateToken, updateByID);
router.route("/:id").delete(validateToken, deleteByID);

export default router;
