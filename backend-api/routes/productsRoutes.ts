import {
  getProducts,
  createProduct,
  updateByID,
  deleteByID,
} from "../controllers/productsController.js";
import {Router} from "express";

const router:Router = Router();

router.route("/").post(createProduct);
router.route("/").get(getProducts);
router.route("/:id").patch(updateByID);
router.route("/:id").delete(deleteByID);

export default router;
