// modules/user/user.controller.ts
import { Request, Response } from "express";
import * as userService from "./user.service";;

 export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser (req.body);
  res.json(user);
 }

 export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
 }

 export const getUserById = async (req: Request, res: Response) => {
  const {id} = req.params;
  const user =await userService.getUserById(id);
  res.json(user);
 }

 export const updateUser = async (req: Request, res: Response) => {
  const {id} = req.params;
  const user = await userService.updateUser(id, req.body);
  res.json({success: true, message: "user updated", user});
 }

 export const deleteUser = async (req: Request, res: Response) => {
  const {id} = req.params;
  const user =await userService.deleteUser(id);
  res.json({success: true, message: "user deleted", user});
 }