import { Router } from 'express';
import { System } from '../System';
import {
  ConceptsRequest,
  ConceptsResponse,
  CreateConceptRequest,
  CreateConceptResponse,
  DeleteConceptsRequest,
  GetConceptDataRequest,
  GetConceptDataResponse,
  Routes,
  UpdateConceptDataRequest,
  UpdateConceptRequest
} from '@projectstorm/tornado-common';
import { createApiRoute } from '../routeUtils';

export const setupConceptRoutes = (router: Router, system: System) => {
  createApiRoute<CreateConceptRequest, CreateConceptResponse>({
    router,
    system,
    route: Routes.CONCEPT_CREATE,
    cb: async ({ user, data }) => {
      const concept = await system.concepts.createConcept(user, data.name);
      return {
        concept: system.concepts.encodeConcept(concept)
      };
    }
  });

  createApiRoute<ConceptsRequest, ConceptsResponse>({
    router,
    system,
    route: Routes.CONCEPTS,
    cb: async ({ user, data }) => {
      const res = await system.db.conceptBoard.findMany({
        where: {
          user: {
            id: user.id
          }
        }
      });
      return {
        concepts: res.map((concept) => {
          return system.concepts.encodeConcept(concept);
        })
      };
    }
  });

  createApiRoute<DeleteConceptsRequest>({
    router,
    system,
    route: Routes.CONCEPT_DELETE,
    cb: async ({ user, data }) => {
      await system.db.conceptBoard.delete({
        where: {
          id: data.board_id
        }
      });
      return {};
    }
  });

  createApiRoute<UpdateConceptRequest, any>({
    router,
    system,
    route: Routes.CONCEPT_UPDATE,
    cb: async ({ user, data }) => {
      await system.db.conceptBoard.update({
        where: {
          id: data.board.id
        },
        data: {
          name: data.board.name
        }
      });
      return {};
    }
  });

  createApiRoute<UpdateConceptDataRequest, any>({
    router,
    system,
    route: Routes.CONCEPT_UPDATE_DATA,
    cb: async ({ user, data }) => {
      await system.db.conceptBoard.update({
        where: {
          id: data.board_id
        },
        data: {
          data: data.data
        }
      });
      return {};
    }
  });

  createApiRoute<GetConceptDataRequest, GetConceptDataResponse>({
    router,
    system,
    route: Routes.CONCEPT_GET_DATA,
    cb: async ({ user, data }) => {
      const d = await system.db.conceptBoard.findFirst({
        where: {
          id: data.board_id
        }
      });
      return {
        data: d.data
      };
    }
  });
};
