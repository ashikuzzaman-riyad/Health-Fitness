import { prisma } from "../../../lib/prisma";

export const createCategory = (data: any) => {
  return prisma.category.create({ data });
};

export const getCategories = () => {
  return prisma.category.findMany();
};
