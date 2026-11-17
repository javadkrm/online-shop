import type { ApiError, ProductResponse } from "../types/Product";

export async function getProducts(
  page: number,
  limit: number
): Promise<ProductResponse> {
  const skip = (page - 1) * limit;

  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    const errorData = await response.json();

    const error: ApiError = {
      message: errorData.message ?? "Failed to fetch products",
      status: response.status,
    };

    throw error;
  }

  return response.json() as Promise<ProductResponse>;
}