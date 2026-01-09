import { Request, Response } from "express";
import * as CategoryService from "./category.service";

export const createCategory = async (req: Request, res: Response) => {
  const category = await CategoryService.createCategory(req.body);
  res.json(category);
};

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await CategoryService.getCategories();
  res.json(categories);
};
