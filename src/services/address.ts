import { AxiosResponse } from 'axios';
import HttpClient from './http';

export interface IAddressResponse {
  _id: string;
  id: string;
  addname: string;
  addfullname: string;
  createdAt: string;
}

export interface IAddressRequest {
  id?: string;
  addname: string;
  addfullname: string;
}

interface IAddressService {
  fetchAdd: () => Promise<AxiosResponse>;
  createAdd: ({ addname, addfullname }: IAddressRequest) => Promise<AxiosResponse>;
  updateAdd: ({ addname, addfullname }: IAddressRequest) => Promise<AxiosResponse>;
  deleteAdd: (id: string) => Promise<AxiosResponse>;
}

export default class AddressService implements IAddressService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  // 주소 데이터 Fetch API
  async fetchAdd(): Promise<AxiosResponse> {
    const data = await this.http.fetch('/address', {
      method: 'GET',
    });
    return data;
  };

  // 주소 데이터 Create API
  async createAdd({ addname, addfullname }: IAddressRequest): Promise<AxiosResponse> {
    const data = await this.http.fetch('/address', {
      method: 'POST',
      body: JSON.stringify({
        addname,
        addfullname,
      }),
    });
    return data;
  };

  // 주소 데이터 Update API
  async updateAdd({ id, addname, addfullname }: IAddressRequest): Promise<AxiosResponse> {
    const data = await this.http.fetch(`/address/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        addname,
        addfullname,
      }),
    });
    return data;
  }

  // 주소 데이터 Delete API
  async deleteAdd(id: string): Promise<AxiosResponse> {
    const data = await this.http.fetch(`/address/${id}`, {
      method: 'DELETE',
    });
    return data;
  }
}

