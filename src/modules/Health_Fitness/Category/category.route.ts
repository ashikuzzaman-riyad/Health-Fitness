import { Router } from "express";
import * as CategoryController from "./category.controller";

const router = Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getCategories);

export const categoryRoutes= router;
