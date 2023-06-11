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

  async post(route: Routes, req: any) {
    let body = req || null;
    let headers = {};
    if (req instanceof FormData) {
      body = req;
    } else if (req) {
      body = JSON.stringify(req);
      headers = {
        ...headers,
        'Content-Type': 'application/json'
      };
    }

    const res = await fetch(`${this.options.baseURL}${route}`, {
      method: 'POST',
      body: body,
      credentials: 'same-origin',
      headers: headers
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
