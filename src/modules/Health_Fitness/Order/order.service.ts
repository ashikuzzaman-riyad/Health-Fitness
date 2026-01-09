import { prisma } from "../../../lib/prisma";

export const createOrder = (data: any) => {
  return prisma.order.create({
    data: {
      userId: data.userId,
      total: data.total,
      status: data.status,

      products: {
        create: data.products.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },

    include: {
      products: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });
};

export const getOrders = () => {
  return prisma.order.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });
};

export const getOrderbyId = (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });
};

export const updateOrder = (id: string, data: any) => {
  return prisma.order.update({
    where: { id },
    data,
    include: {
      products: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });
};

export const deleteOrder = (id: string) => {
  return prisma.order.delete({
    where: { id },
    include: {
      products: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });
};
