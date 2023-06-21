export interface ConceptBoard {
  id: number;
  name: string;
  data: any;
}

export interface FileData {
  id: number;
  width: number;
  height: number;
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

// !----- UPDATE ----

export interface UpdateConceptRequest {
  board: ConceptBoard;
}

// !----- delete ----

export interface DeleteConceptsRequest {
  board_id: number;
}

export interface DeleteConceptsResponse {}
