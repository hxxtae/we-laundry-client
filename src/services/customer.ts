import { AxiosResponse } from 'axios';
import HttpClient from './http';

export interface ICustomerResponse {
  _id: string;
  id: string;
  addid?: string;
  addname?: string;
  addfullname?: string;
  name?: string;
  dong?: string;
  ho?: string;
  createdAt: string;
}

export interface ICustomerRequest {
  id?: string;
  addid?: string;
  addname?: string;
  addfullname?: string;
  name?: string;
  dong?: string;
  ho?: string;
}

export interface ICustomerSearchRequest {
  addname?: string;
  name?: string;
  dong?: string;
  ho?: string;
}

interface ICustomerService {
  searchFetchCus: ({ name, addname, dong, ho }: ICustomerSearchRequest) => Promise<AxiosResponse>;
  createCus: ({ addid, addfullname, name, dong, ho }: ICustomerRequest) => Promise<AxiosResponse>;
  updateCus: ({ id, addid, addname, addfullname, name, dong, ho }: ICustomerRequest) => Promise<AxiosResponse>;
  deleteCus: (id: string) => Promise<AxiosResponse>;
}

export default class CustomerService implements ICustomerService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  async searchFetchCus({ name, addname, dong, ho }: ICustomerSearchRequest): Promise<AxiosResponse> {
    if (!!name) {
      const data = await this.http.fetch(`/customer/${name}`, {
        method: 'GET',
      });
      return data;
    }

    if (!!dong && !ho) {
      const data = await this.http.fetch(`/customer/${addname}/${dong}`, {
        method: 'GET',
      });
      return data;
    }

    if (!!ho) {
      const data = await this.http.fetch(`/customer/${addname}/${dong}/${ho}`, {
        method: 'GET',
      });
      return data;
    }

    const data = await this.http.fetch(`/customer/(none)`, {
      method: 'GET',
    });
    return data;
  }

  async createCus({ addid, addname, addfullname, name, dong, ho }: ICustomerRequest): Promise<AxiosResponse> {
    const data = await this.http.fetch('/customer', {
      method: 'POST',
      body: JSON.stringify({
        addid,
        addname,
        addfullname,
        name,
        dong,
        ho,
      }),
    });
    return data;
  }
  
  async updateCus({ id, addid, addname, addfullname, name, dong, ho }: ICustomerRequest) {
    const data = await this.http.fetch(`/customer/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        addid,
        addname,
        addfullname,
        name,
        dong,
        ho,
      }),
    });
    return data;
  }

  async deleteCus(id: string) {
    const data = await this.http.fetch(`/customer/${id}`, {
      method: 'DELETE',
    });
    return data;
  }
}
