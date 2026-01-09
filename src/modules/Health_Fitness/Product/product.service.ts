import { prisma } from "../../../lib/prisma";

export const createProduct = (data: any) => {
  return prisma.product.create({ data });
};

export const getProducts = () => {
  return prisma.product.findMany({
    include: { category: true },
  });
};

export const getProductsId = (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
};

export const updateProduct = (id: string, data: any) => {
  return prisma.product.update({
    where: { id },
    data,
    include: { category: true },
  });
};

export const deleteProduct = (id: string) => {
  return prisma.product.delete({
    where: { id },
    include: { category: true },
  });
};
