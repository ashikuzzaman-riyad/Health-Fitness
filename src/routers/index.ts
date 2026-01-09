import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { categoryRoutes } from "../modules/Health_Fitness/Category/category.route";
import { productRoutes } from "../modules/Health_Fitness/Product/product.route";
import { OrderRoutes } from "../modules/Health_Fitness/Order/order.route";

const router = Router();

router.use("/users", UserRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/orders", OrderRoutes);

export default router;
