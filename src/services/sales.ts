import { AxiosResponse } from 'axios';
import HttpClient from './http';

export interface IProductStats {
  categoryId: string;
  categoryName: string;
  productId: string;
  productName: string;
  count: number;
  price: number;
}

export interface IGetProductSales {
  _id: string;
  id: string;
  productStats: IProductStats[];
}

interface ISalesService {
  getAllProductSale: () => Promise<AxiosResponse>;
}

export default class SalesService implements ISalesService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  async getAllProductSale() {
    const data = await this.http.fetch('/sales', {
      method: 'GET',
    });
    return data;
  };
}
