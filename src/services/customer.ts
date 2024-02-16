import { AxiosResponse } from 'axios';
import HttpClient from './http';

export interface ICustomerResponse {
  _id: string;
  id: string;
  addid: string;
  addname: string;
  addfullname: string;
  name?: string;
  dong: string;
  ho: string;
  createdAt: string;
}

export interface ICustomerCreateRequest {
  addid: string;
  addname: string;
  addfullname: string;
  name?: string;
  dong: string;
  ho: string;
}

export interface ICustoemrUpdateRequest {
  id: string;
  addid: string;
  addname: string;
  addfullname: string;
  name?: string;
  dong: string;
  ho: string;
}

export interface ICustomerSearchRequest {
  addname: string;
  dong?: string;
  ho?: string;
}

interface ICustomerService {
  fetchAllCus: () => Promise<AxiosResponse>;
  searchFetchCus: ({ addname, dong, ho }: ICustomerSearchRequest) => Promise<AxiosResponse>;
  createCus: ({ addid, addname, addfullname, name, dong, ho }: ICustomerCreateRequest) => Promise<AxiosResponse>;
  updateCus: ({ id, addid, addname, addfullname, name, dong, ho }: ICustoemrUpdateRequest) => Promise<AxiosResponse>;
  deleteCus: (id: string) => Promise<AxiosResponse>;
}

export default class CustomerService implements ICustomerService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  // 고객 단지 정보 데이터 Fetch API (All)
  async fetchAllCus(): Promise<AxiosResponse>  {
    const data = await this.http.fetch('/customer/all', {
      method: 'GET',
    });
    return data;
  }

  // 고객 단지 정보 데이터 Fetch API (Filter)
  async searchFetchCus({ addname, dong, ho }: ICustomerSearchRequest): Promise<AxiosResponse> {
    const data = await this.http.fetch(`/customer?addname=${addname}&dong=${dong}&ho=${ho}`, {
      method: 'GET',
    });
    return data;
  }

  // 고객 단지 정보 데이터 Create API
  async createCus({ addid, addname, addfullname, name, dong, ho }: ICustomerCreateRequest): Promise<AxiosResponse> {
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
  
  // 고객 단지 정보 데이터 Update API
  async updateCus({ id, addid, addname, addfullname, name, dong, ho }: ICustoemrUpdateRequest) {
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

  // 고객 단지 정보 데이터 Delete API
  async deleteCus(id: string) {
    const data = await this.http.fetch(`/customer/${id}`, {
      method: 'DELETE',
    });
    return data;
  }
}
