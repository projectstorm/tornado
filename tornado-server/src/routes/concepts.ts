import { Router } from 'express';
import { System } from '../System';
import {
  ConceptsRequest,
  ConceptsResponse,
  CreateConceptRequest,
  CreateConceptResponse,
  DeleteConceptsRequest,
  DeleteConceptsResponse,
  Routes
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
        concept
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
        concepts: res
      };
    }
  });

  createApiRoute<DeleteConceptsRequest, DeleteConceptsResponse>({
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
};
