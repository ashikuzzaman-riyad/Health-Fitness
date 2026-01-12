import { prisma } from "../../../lib/prisma";

export const createProduct = (data: any) => {
  return prisma.product.create({ data });
};

export const getProducts = (name?: string) => {
  return prisma.product.findMany({
    where: name
      ? { name: { contains: name, mode: "insensitive" } }
      : {},
    include: { category: true }
  });
};



// export const getProductsId = (id: string) => {
//   return prisma.product.findUnique({
//     where: { id },
//     include: { category: true },
//   });
// };

export const getProductsBySlug = (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
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
