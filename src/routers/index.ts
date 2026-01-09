import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { categoryRoutes } from "../modules/Health_Fitness/Category/category.route";
import { productRoutes } from "../modules/Health_Fitness/Product/product.route";

const router = Router();

router.use("/users", UserRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;
