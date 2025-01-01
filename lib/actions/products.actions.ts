'use server';
import { PrismaClient } from "@prisma/client";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { convertToPlainObject } from "../utils";

export const getLatestProducts = async () => {
  const primsa = new PrismaClient();

  const data = await primsa.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });

  return convertToPlainObject(data);
};

// Get Single Product
export async function getProductBySlug(slug: string) {
  const primsa = new PrismaClient();

  const data = await primsa.product.findUnique({
    where: {
      slug,
    },
  });

  return convertToPlainObject(data);
}