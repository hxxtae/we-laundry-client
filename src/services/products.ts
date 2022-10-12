import { AxiosResponse } from 'axios';
import HttpClient from './http';

export type IProductRequest = IProducts & {
  index: number;
}

export type IProducts = {
  productId: string;
  productName: string;
  price: number;
}

export interface IProductObjResponse {
  _id: string;
  id: string;
  categoryName: string;
  products: IProducts[];
  createAt: string;
}

export interface ICategoryRequest {
  id?: string;
  categoryName: string;
}

export interface IProductCreateRequest {
  id: string;
  productName: string;
  price: number;
}

export interface IProductsUpdateRequest {
  id: string;
  products: IProducts[];
}

interface IProductsService {
  fetchProductObjs: () => Promise<AxiosResponse>;
  createCategory: ({ categoryName }: ICategoryRequest) => Promise<AxiosResponse>;
  createProduct: ({id, productName, price}: IProductCreateRequest) => Promise<AxiosResponse>;
  updateCategory: ({ id, categoryName }: ICategoryRequest) => Promise<AxiosResponse>;
  updateProduct: ({ id, products }: IProductsUpdateRequest) => Promise<AxiosResponse>;
  deleteCategory: (id: string) => Promise<AxiosResponse>;
}

export default class ProductsService implements IProductsService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  async fetchProductObjs(): Promise<AxiosResponse> {
    const data = await this.http.fetch('/products', {
      method: 'GET',
    });
    return data;
  };

  async createCategory({ categoryName }: ICategoryRequest) {
    const data = await this.http.fetch('/products', {
      method: 'POST',
      body: JSON.stringify({
        categoryName,
      }),
    });
    return data;
  };

  async createProduct({ id, productName, price }: IProductCreateRequest) {
    const data = await this.http.fetch(`/products/list`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        productName,
        price,
      }),
    });
    return data;
  };

  async updateCategory({ id, categoryName }: ICategoryRequest) {
    const data = await this.http.fetch(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        categoryName,
      }),
    });
    return data;
  };

  async updateProduct({ id, products }: IProductsUpdateRequest) {
    const data = await this.http.fetch(`/products/list/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        products,
      }),
    });
    return data;
  };

  async deleteCategory(id: string) {
    const data = await this.http.fetch(`/products/${id}`, {
      method: 'DELETE',
    });
    return data;
  };
}
