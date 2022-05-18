import axios, { AxiosResponse, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

interface Options {
  method: string;
  headers?: {};
  body?: string;
}

interface IHttpClient {
  fetch: (url: string, options: Options) => Promise<AxiosResponse>;
}

export default class HttpClient implements IHttpClient {
  private client: AxiosInstance;

  constructor(private baseURL: string, private csrfToken: any) {
    this.baseURL = baseURL;
    this.csrfToken = csrfToken;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
  }

  async fetch(url: string, options: Options): Promise<AxiosResponse> {
    const { method, headers, body } = options;
    const req = {
      url,
      method,
      headers: {
        ...headers,
        'weLaundry-csrf-token': this.csrfToken(),
      },
      data: body,
    };

    try {
      const res = await this.client(req);      
      return res;
    } catch (e: any) {
      if (e.response) {
        const data = e.response.data;
        const message = data && data.message ? data.message : 'Server went wrong!';
        console.log(message);
        throw new Error(message);
      }
      throw new Error('connection error');
    }
  }
}
