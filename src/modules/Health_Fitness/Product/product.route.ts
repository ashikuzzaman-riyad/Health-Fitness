import { Router } from "express";
import * as ProductController from "./product.controller";

const router = Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getProducts);
// router.get("/:id", ProductController.getProductsId);
router.get("/:slug", ProductController.getProductBySlug);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export const productRoutes = router;
