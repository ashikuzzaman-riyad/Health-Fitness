import { prisma } from "../../../lib/prisma";

export const createCategory = (data: any) => {
  return prisma.category.create({ data });
};

export const getCategories = () => {
  return prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
  });
};

export const getSubCategoriesBySlug = async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
    include: { children: true },
  });
};



export const getProductsByCategorySlug = async (slug: string) => {
  return prisma.product.findMany({
    where: {
      category: {
        slug: slug,
      },
    },
    include: {
      category: true,
    },
  });
};

export const getProductsBySubCategorySlug = async (slug: string) => {
  return prisma.product.findMany({
    where: {
      category: {
        slug: slug,
      },
    },
    include: {
      category: true,
    },
  });
};

export const getProductsByMainCategory = async (slug: string) => {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { children: true },
  });

  if (!category) return [];

  const categoryIds = [category.id, ...category.children.map((c) => c.id)];

  return prisma.product.findMany({
    where: {
      categoryId: {
        in: categoryIds,
      },
    },
    include: {
      category: true,
    },
  });
};

const getAllCategoryIds = async (categoryId: string): Promise<string[]> => {
  const children = await prisma.category.findMany({
    where: { parentId: categoryId },
  });

  let ids = [categoryId];

  for (const child of children) {
    ids = ids.concat(await getAllCategoryIds(child.id));
  }

  return ids;
};

export const getProductsByAnyCategorySlug = async (slug: string) => {
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) return [];

  const ids = await getAllCategoryIds(category.id);

  return prisma.product.findMany({
    where: {
      categoryId: { in: ids },
    },
    include: { category: true },
  });
};

export const getCategoryBySlug = (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
  });
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
