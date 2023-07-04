import {
  ConceptsRequest,
  ConceptsResponse,
  CreateConceptRequest,
  CreateConceptResponse,
  DeleteConceptsRequest,
  GetConceptDataRequest,
  GetConceptDataResponse,
  LoginRequest,
  LoginResponse,
  MediaCropRequest,
  Routes,
  UpdateConceptDataRequest,
  UpdateConceptRequest
} from '@projectstorm/tornado-common';

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
    const responseType = res.headers.get('Content-Type');
    if (responseType?.includes('application/json')) {
      return res.json();
    }
    if (responseType?.includes('text/html')) {
      throw new TornadoClientError(res);
    }

    return null;
  }

  createRoute<Req, Res>(route: Routes) {
    return (req?: Req) => {
      return this.post(route, req) as Promise<Res>;
    };
  }

  login = this.createRoute<LoginRequest, LoginResponse>(Routes.LOGIN);

  signOut = this.createRoute(Routes.SIGN_OUT);

  // !------ concepts ------

  concepts = this.createRoute<ConceptsRequest, ConceptsResponse>(Routes.CONCEPTS);

  createConcept = this.createRoute<CreateConceptRequest, CreateConceptResponse>(Routes.CONCEPT_CREATE);

  deleteConcept = this.createRoute<DeleteConceptsRequest, void>(Routes.CONCEPT_DELETE);

  updateConcept = this.createRoute<UpdateConceptRequest, void>(Routes.CONCEPT_UPDATE);

  getConceptData = this.createRoute<GetConceptDataRequest, GetConceptDataResponse>(Routes.CONCEPT_GET_DATA);

  updateConceptData = this.createRoute<UpdateConceptDataRequest, void>(Routes.CONCEPT_UPDATE_DATA);

  // !----- media -----------

  mediaCrop = this.createRoute<MediaCropRequest, void>(Routes.MEDIA_CROP);
}
