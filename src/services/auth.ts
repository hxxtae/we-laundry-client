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

  // 회원가입 API
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

  // 로그인 API
  async login({ username, password }: LoginRequest): Promise<AxiosResponse> {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    localStorage.setItem('tabletToken', data?.data.token); // (추후 삭제 예정)
    return data;
  }

  // 로그아웃 API
  async logout() {
    const data = this.http.fetch('/auth/logout', {
      method: 'POST',
    });
    localStorage.removeItem('tabletToken'); // (추후 삭제 예정)
    return data;
  }

  // 로그인 여부 확인 API
  async me(): Promise<AxiosResponse> {
    const data = await this.http.fetch('/auth/me', {
      method: 'GET',
    });
    return data;
  }

  // CSRF 공격 방지 API
  async csrfToken(): Promise<AxiosResponse> {
    const data = await this.http.fetch('/auth/csrf-token', {
      method: 'GET'
    });
    return data;
  }
}
