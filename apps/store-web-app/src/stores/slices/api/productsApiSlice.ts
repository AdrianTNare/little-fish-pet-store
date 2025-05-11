import { Product } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetAllPetFishParams {
  page: number;
  size: number;
}

interface ProductsResponse {
  page: number;
  total: number;
  products: Product[];
}

export const productsApiSlice = createApi({
  tagTypes: ["Products"],
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (build) => ({
    getAllPetFish: build.query<ProductsResponse, GetAllPetFishParams>({
      query: ({ page, size }) => `products/pet-fish?page=${page}&size=${size}`,
    }),
    getPetFishById: build.query<Product, string>({
      query: (id) => `products/pet-fish/${id}`,
    }),
  }),
});

export const { useGetAllPetFishQuery, useGetPetFishByIdQuery } =
  productsApiSlice;
