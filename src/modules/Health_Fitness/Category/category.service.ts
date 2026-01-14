import { prisma } from "../../../lib/prisma";
import { cleanString } from "../../../utils/helper";

// create category
export const createCategory = async (data: { name: string; parentId?: string }) => {
  // Generate a base slug from the name
  let baseSlug = cleanString(data.name, true); // e.g., "Organic Food" -> "organic-food"
  let slug = baseSlug;
  let counter = 1;

  // Ensure slug is unique
  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  // Create category with unique slug
  const category = await prisma.category.create({
    data: {
      ...data,
      slug,
    },
  });

  return category;
};

// get all categories
export const getCategories = () => {
  return prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
  });
};

// get subcategories by slug
export const getCategoryWithChildrenBySlug = async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
    include: { children: true },
  });
};



// get products by category slug
export const getProductsByCategorySlug = async (slug: string) => {
  return prisma.product.findMany({
    where: {
      category: { slug },
    },
    include: { category: true },
  });
};




// helper function to all category IDs recursively
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


// update category

export const updateCategory = (id: string, data: any) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

// delete category
export const deleteCategory = (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};
