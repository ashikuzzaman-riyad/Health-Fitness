import { prisma } from "../../../lib/prisma";

export const createCategory = (data: any) => {
  return prisma.category.create({ data });
};

export const getCategories = () => {
  return prisma.category.findMany();
};

export const updateCategory = (id: string, data: any) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};
