import { Request,  Response } from "express";
import * as OrderService from "./order.service";

export const createOrder = async (req: Request, res: Response) => {
  const order = await OrderService.createOrder(req.body);
  res.json(order);
};

export const getOrders = async (_req: Request, res: Response) => {
  const orders = await OrderService.getOrders();
  res.json(orders);
};

export const getOrderbyId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderService.getOrderbyId(id);
  res.json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderService.deleteOrder(id);
  res.json({ success: true, message: "order deleted", order });
};
