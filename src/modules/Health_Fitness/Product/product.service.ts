import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { cleanString } from "../../../utils/helper";

export const createProduct = (data: Prisma.ProductCreateInput) => {
  return prisma.product.create({ data });
};

// Search products with pagination and clean search
export interface SearchQuery {
  name?: string;
  slug?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc"; // ✅ FIXED
}

export const getProducts = async (query?: SearchQuery) => {
  const filters: any = {};

  if (query?.name) {
    filters.name = { contains: cleanString(query.name), mode: "insensitive" };
  }

  if (query?.slug) {
    filters.slug = cleanString(query.slug, true);
  }

  // Pagination: page & limit
  const page = query?.page && query.page > 0 ? query.page : 1;
  const limit = query?.limit && query.limit > 0 ? query.limit : 20;
  // sorting
  const sortBy = query?.sortBy || "createdAt";
  const sortOrder = query?.sortOrder || "desc";
  return prisma.product.findMany({
    where: filters,
    include: { category: true },
    orderBy: { 
      [sortBy]: sortOrder,
     },
    skip: (page - 1) * limit,
    take: limit,
  });
};

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
