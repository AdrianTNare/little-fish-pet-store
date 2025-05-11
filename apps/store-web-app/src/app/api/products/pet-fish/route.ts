import { fishProducts } from "@/fixtures/fishProducts";
import { Product } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = parseInt(searchParams.get("page") ?? "0");

  const size = parseInt(searchParams.get("size") ?? "0");

  const total = fishProducts.length;

  let products: Product[] = [];

  if (page && size) {
    products = fishProducts.slice((page - 1) * size, page * size);
  }

  return NextResponse.json({
    page,
    total,
    products,
  });
}
