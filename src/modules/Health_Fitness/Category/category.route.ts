import { Router } from "express";
import * as CategoryController from "./category.controller";

const router = Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getCategories);
router.get("/:slug", CategoryController.getCategoriesBySlug);
router.get("/:slug/subcategories", CategoryController.getSubCategoriesBySlug);
router.put("/:id", CategoryController.getCategoriesUpdated);
router.get("/:slug/products", CategoryController.getProducts);
// router.get("/categories/:slug/subcategories", getCat);

router.delete("/:id", CategoryController.getCategoriesDeleted);

export const categoryRoutes = router;
