import { LoginRequest, LoginResponse, Routes } from '@projectstorm/tornado-common';

export interface TornadoClientOptions {
  baseURL: string;
}

export class TornadoClientError extends Error {
  constructor(public response: Response) {
    super();
  }
}

export class TornadoClient {
  constructor(protected options: TornadoClientOptions) {}

  async post(route: Routes, req) {
    const res = await fetch(`${this.options.baseURL}${route}`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
        'Accept-Type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new TornadoClientError(res);
    }
    return res.json();
  }

  createRoute<Req, Res>(route: Routes) {
    return (req: Req) => {
      return this.post(route, req) as Promise<Res>;
    };
  }

  login = this.createRoute<LoginRequest, LoginResponse>(Routes.LOGIN);
}
