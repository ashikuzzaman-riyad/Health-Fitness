export interface VariantAttributeInput {
  attribute: string;
  value: string;
}

export interface VariantInput {
  sku: string;
  price: number;
  stock?: number;
  isDefault?: boolean;
  attributes: VariantAttributeInput[];
}

export interface ImageInput {
  url: string;
  isMain?: boolean;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  basePrice?: number;
  salePrice?: number;
  description?: string;
  ingredients?: string;
  nutritionInfo?: any;
  brand?: string;
  expiryDays?: number;
  categoryId: string;
  images?: ImageInput[];
  variants: VariantInput[];
}

export interface SearchQuery {
  name?: string;
  slug?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc"; // ✅ FIXED
}