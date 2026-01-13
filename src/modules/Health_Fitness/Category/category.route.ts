import { Router } from "express";
import * as CategoryController from "./category.controller";

const router = Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getCategories);

router.get("/:slug", CategoryController.getCategoryWithChildren);

router.put("/:id", CategoryController.updateCategory);
router.get("/:slug/products", CategoryController.getProducts);
// router.get("/categories/:slug/subcategories", getCat);

router.delete("/:id", CategoryController.deleteCategory);

export const categoryRoutes = router;
