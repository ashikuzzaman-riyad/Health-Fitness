import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";


import { CreateProductInput, SearchQuery } from "./product.types";
import makeSlug, { cleanString } from "../../../utils/helper";

export async function createProduct(data: CreateProductInput) {
  const productSlug = makeSlug(data.name);
  return prisma.$transaction(async (tx) => {
 

 

    // Create product
    return tx.product.create({
      data: {
        name: data.name,
        slug: productSlug, // use auto-generated unique slug
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

export const getProductBySlug = async (slug: string) => {
  return prisma.product.findFirst({
    where: {
      slug,
      isActive: true,
    },

    select: {
      name: true,
      slug: true,
      basePrice: true,
      salePrice: true,
      description: true,
      ingredients: true,
      nutritionInfo: true,
      brand: true,
      expiryDays: true,

      category: {
        select: {
          name: true,
          slug: true,
        },
      },

      images: {
        select: {
          url: true,
          isMain: true,
        },
        orderBy: {
          isMain: "desc",
        },
      },

      variants: {
        orderBy: {
          isDefault: "desc",
        },
        select: {
          sku: true,
          price: true,
          stock: true,
          isDefault: true,

          attributes: {
            select: {
              attributeValue: {
                select: {
                  value: true,
                  attribute: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
};



export const updateProduct = async (id: string, data: any) => {
  return prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      basePrice: data.basePrice,
      salePrice: data.salePrice,
      description: data.description,
      ingredients: data.ingredients,
      nutritionInfo: data.nutritionInfo,
      brand: data.brand,
      expiryDays: data.expiryDays,
      categoryId: data.categoryId,
      isActive: data.isActive,
    },
    include: {
      category: true,
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

