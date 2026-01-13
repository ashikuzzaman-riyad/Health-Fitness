import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { cleanString } from ".././../../lib/helper";

export const createProduct = (data: Prisma.ProductCreateInput) => {
  return prisma.product.create({ data });
};



// Search products with pagination and clean search
interface SearchQuery {
  name?: string;
  slug?: string;
  page?: number;
  limit?: number;
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

  return prisma.product.findMany({
    where: filters,
    include: { category: true },
    orderBy: { createdAt: "desc" },
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
