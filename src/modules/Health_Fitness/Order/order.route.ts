import { Router } from "express";
import * as OrderController from "./order.controller";

const router = Router();
router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.get("/:id", OrderController.getOrderbyId);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

export const OrderRoutes = router;
