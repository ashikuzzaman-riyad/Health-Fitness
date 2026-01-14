import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { cleanString } from "../../../utils/helper";

import { CreateProductInput } from "./product.types";

export async function createProduct(data: CreateProductInput) {
  return prisma.$transaction(async (tx) => {
  // Generate a base slug from the name
  let baseSlug = cleanString(data.name, true); // e.g., "Organic Food" -> "organic-food"
  let slug = baseSlug;
  let counter = 1;

  // Ensure slug is unique
  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

    // Create product
    return tx.product.create({
      data: {
        name: data.name,
        slug, // use auto-generated unique slug
        basePrice: data.basePrice,
        salePrice: data.salePrice,
        description: data.description,
        ingredients: data.ingredients,
        nutritionInfo: data.nutritionInfo,
        brand: data.brand,
        expiryDays: data.expiryDays,
        categoryId: data.categoryId,

        images: {
          create: data.images?.map((img) => ({
            url: img.url,
            isMain: img.isMain ?? false,
          })),
        },

        variants: {
          create: await Promise.all(
            data.variants.map(async (variant) => ({
              sku: variant.sku,
              price: variant.price,
              stock: variant.stock,
              isDefault: variant.isDefault ?? false,

              attributes: {
                create: await Promise.all(
                  variant.attributes.map(async (attr) => {
                    const attribute = await tx.attribute.upsert({
                      where: { name: attr.attribute },
                      update: {},
                      create: { name: attr.attribute },
                    });

                    const attributeValue = await tx.attributeValue.upsert({
                      where: {
                        attributeId_value: {
                          attributeId: attribute.id,
                          value: attr.value,
                        },
                      },
                      update: {},
                      create: {
                        attributeId: attribute.id,
                        value: attr.value,
                      },
                    });

                    return {
                      attributeValueId: attributeValue.id,
                    };
                  })
                ),
              },
            }))
          ),
        },
      },

      include: {
        images: true,
        variants: {
          include: {
            attributes: {
              include: {
                attributeValue: {
                  include: {
                    attribute: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  });
}

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

  // Pagination
  const page = query?.page && query.page > 0 ? query.page : 1;
  const limit = query?.limit && query.limit > 0 ? query.limit : 20;

  // Sorting
  const sortBy = query?.sortBy || "createdAt";
  const sortOrder = query?.sortOrder || "desc";

  return prisma.product.findMany({
    where: filters,
    select: {
      id: true,
      name: true,
      slug: true,
      basePrice: true,
      salePrice: true,
      isActive: true,
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
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
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,   // Product's category
      images: true,     // All product images
      variants: {       // All variants
        include: {
          attributes: {    // Variant attributes
            include: {
              attributeValue: { // Attribute value
                include: {
                  attribute: true, // The attribute itself
                },
              },
            },
          },
        },
      },
    },
  });
};


export const deleteProduct = async (id: string) => {
  return prisma.$transaction(async (tx) => {
    // Delete product images
    await tx.productImage.deleteMany({ where: { productId: id } });

    // Delete variant attributes first
    const variants = await tx.productVariant.findMany({ where: { productId: id } });
    for (const v of variants) {
      await tx.variantAttribute.deleteMany({ where: { productVariantId: v.id } });
    }

    // Delete variants
    await tx.productVariant.deleteMany({ where: { productId: id } });

    // Delete the product itself
    return tx.product.delete({ where: { id } });
  });
};

