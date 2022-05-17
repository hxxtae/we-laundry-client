import { AxiosResponse } from 'axios';
import HttpClient from './http';

interface FetchResponse {
  token: string;
  username: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface SignupRequest {
  username: string;
  password: string;
  tel: string;
}

interface IAuthService {
  signup: ({ username, password, tel }: SignupRequest) => Promise<AxiosResponse>;
  login: ({ username, password }: LoginRequest) => Promise<AxiosResponse>;
  logout: () => Promise<AxiosResponse>;
  me: () => Promise<AxiosResponse>;
  csrfToken: () => Promise<AxiosResponse>;
}

export default class AuthService implements IAuthService {
    
  constructor(private http: HttpClient) {
    this.http = http;
  }

  async signup({ username, password, tel }: SignupRequest): Promise<AxiosResponse> {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        tel,
      }),
    });
    return data;
  }

  async login({ username, password }: LoginRequest): Promise<AxiosResponse> {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    return data;
  }

  async logout() {
    const data = this.http.fetch('/auth/logout', {
      method: 'POST',
    });
    return data;
  }

  async me(): Promise<AxiosResponse> {
    const data = await this.http.fetch('/auth/me', {
      method: 'GET',
    });
    return data;
  }

  async csrfToken(): Promise<AxiosResponse> {
    const data = await this.http.fetch('/auth/csrf-token', {
      method: 'GET'
    });
    return data;
  }
}
