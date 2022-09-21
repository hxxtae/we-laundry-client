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

export interface ICustomerRequest {
  id?: string;
  addid?: string;
  addname: string;
  addfullname?: string;
  name?: string;
  dong?: string;
  ho?: string;
}

export interface ICustomerSearchRequest {
  addname: string;
  dong?: string;
  ho?: string;
}
