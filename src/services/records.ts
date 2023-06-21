import { AxiosResponse } from 'axios';
import { dateToString } from '../components/DateComponent';
import HttpClient from './http';

// 세탁 주문 object
export interface IRecordsOflaundry {
  categoryId: string;
  categoryName: string;
  productId: string;
  productName: string;
  count: number;
  price: number;
};

// 수선 주문 object
export interface IRecordsOfRepair {
  repairId: string;
  repairName: string;
  count: number;
  price: number;
};

export interface IRecordObjResponse {
  _id: string;
  id: string;
  recordDate: string;
  recordCount: number;
  recordPrice: number;
  cusid: string;
  addid: string;
  addname: string;
  dong: string;
  ho: string;
  addfullname: string;
  records: {
    laundry: IRecordsOflaundry[];
    repair: IRecordsOfRepair[];
  }
};

export interface IRecordRequest {
  id?: string;
  recordDate?: string;
  recordCount: number;
  recordPrice: number;
  cusid: string;
  addid: string;
  addname: string;
  dong: string;
  ho: string;
  addfullname: string;
  laundry: IRecordsOflaundry[];
  repair: IRecordsOfRepair[];
}

export interface IRecordSearchRequestByDate {
  recordDate: string;
  recordDateKind: string;
}

export interface IRecordSearchRequestByAdd {
  addname: string;
  dong: string;
  ho: string;
}

export type IRecordSearchRequest = IRecordSearchRequestByDate & IRecordSearchRequestByAdd;

interface IRecordsService {
  createRecord: ({ recordCount, recordPrice, cusid, addid, addname, dong, ho, addfullname, laundry, repair }: IRecordRequest) => Promise<AxiosResponse>;
  searchRecordByDate: (startDate: string, endDate: string) => Promise<AxiosResponse>;
  searchRecordByCustomer: ({ addname, dong, ho }: IRecordSearchRequestByAdd) => Promise<AxiosResponse>;
  deleteRecord: (id: string) => Promise<AxiosResponse>;
}

export default class RecordsService implements IRecordsService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  async createRecord({ recordCount, recordPrice, cusid, addid, addname, dong, ho, addfullname, laundry, repair }: IRecordRequest) {
    const data = await this.http.fetch('/records', {
      method: 'POST',
      body: JSON.stringify({
        recordDate: dateToString(),
        recordCount,
        recordPrice,
        cusid,
        addid,
        addname,
        dong,
        ho,
        addfullname,
        laundry,
        repair,
      }),
    });
    return data;
  }

  async searchRecordByDate(startDate: string, endDate: string) {
    const data = this.http.fetch(`/records/date/?startDate=${startDate}&endDate=${endDate}`, {
      method: 'GET',
    });
    return data;
  }

  async searchRecordByCustomer({ addname, dong, ho }: IRecordSearchRequestByAdd) {
    const data = this.http.fetch(`/records?addname=${addname}&dong=${dong}&ho=${ho}`, {
      method: 'GET',
    });
    return data;
  }

  async deleteRecord(id: string) {
    const data = await this.http.fetch(`/records/${id}`, {
      method: 'DELETE',
    });
    return data;
  }
}
