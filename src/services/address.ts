import { AxiosResponse } from 'axios';
import HttpClient from './http';

export interface IAddressResponse {
  id: string;
  addname: string;
  addfullname: string;
  createdAt: string;
}

export interface IAddressRequest {
  addname: string;
  addfullname: string;
}

interface IAddressService {
  fetchAdd: () => Promise<AxiosResponse>;
  createAdd: ({ addname, addfullname }: IAddressRequest) => Promise<AxiosResponse>;
  updateAdd: ({ addname, addfullname }: IAddressRequest) => Promise<AxiosResponse>;
}

export default class AddressService implements IAddressService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  async fetchAdd(): Promise<AxiosResponse> {
    const data = await this.http.fetch('/address', {
      method: 'GET',
    });
    return data;
  };

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

  async updateAdd({ addname, addfullname }: IAddressRequest): Promise<AxiosResponse> {
    const data = await this.http.fetch('/address:id', {
      method: 'PUT',
      body: JSON.stringify({
        addname,
        addfullname,
      }),
    });
    return data;
  }
}

