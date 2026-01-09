// modules/user/user.service.ts
import { prisma } from "../../lib/prisma";
import { Role } from "@prisma/client";

export const createUser = (data: any) => {
  return prisma.user.create({ data });
};

export const getAllUsers = () => {
  return prisma.user.findMany();
};

export const getUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (id: string, data: any) => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });

  return {
    message: `User with ID ${id} has been updated.`,
  };
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({ where: { id } });
  return {
    message: `User with ID ${id} has been deleted.`,
    user,
  };
};
