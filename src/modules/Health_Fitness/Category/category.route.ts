import { Router } from "express";
import * as CategoryController from "./category.controller";

const router = Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getCategories);
router.put("/:id", CategoryController.getCategoriesUpdated);
router.delete("/:id", CategoryController.getCategoriesDeleted);

export const categoryRoutes= router;
