import { Request, Response } from "express";
import * as OrderService from "./order.service";
import { sendSuccess, sendError } from "../../../utils/error";
// Controller functions with try-catch
export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.createOrder(req.body);
    sendSuccess(res, order, "Order created successfully");
  } catch (error: any) {
    console.error(error);
    sendError(res, "Failed to create order", error.message || error);
  }
};

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await OrderService.getOrders();
    sendSuccess(res, orders, "Orders fetched successfully");
  } catch (error: any) {
    console.error(error);
    sendError(res, "Failed to fetch orders", error.message || error);
  }
};

export const getOrderbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await OrderService.getOrderbyId(id);
    sendSuccess(res, order, "Order fetched successfully");
  } catch (error: any) {
    console.error(error);
    sendError(res, "Failed to fetch order", error.message || error);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await OrderService.updateOrder(id, req.body);
    sendSuccess(res, order, "Order updated successfully");
  } catch (error: any) {
    console.error(error);
    sendError(res, "Failed to update order", error.message || error);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await OrderService.deleteOrder(id);
    sendSuccess(res, order, "Order deleted successfully");
  } catch (error: any) {
    console.error(error);
    sendError(res, "Failed to delete order", error.message || error);
  }
};