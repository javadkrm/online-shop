export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

export interface NewProduct {
  title: string;
  price: number;
  image: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiError {
  message: string;
  status: number;
}