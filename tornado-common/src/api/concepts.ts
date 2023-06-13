export interface ConceptBoard {
  id: number;
  name: string;
}

// !----- list ----

export interface ConceptsRequest {}

export interface ConceptsResponse {
  concepts: ConceptBoard[];
}

// !----- create ----

export type CreateConceptRequest = Pick<ConceptBoard, 'name'>;

export interface CreateConceptResponse {
  concept: ConceptBoard;
}

// !----- delete ----

export interface DeleteConceptsRequest {
  board_id: number;
}

export interface DeleteConceptsResponse {}
