export interface ConceptBoardEncoded {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface FileData {
  id: number;
  width: number;
  height: number;
}

// !----- list ----

export interface ConceptsRequest {}

export interface ConceptsResponse {
  concepts: ConceptBoardEncoded[];
}

// !----- create ----

export type CreateConceptRequest = Pick<ConceptBoardEncoded, 'name'>;

export interface CreateConceptResponse {
  concept: ConceptBoardEncoded;
}

//! ----- DATA ------

export interface GetConceptDataRequest {
  board_id: number;
}

export interface GetConceptDataResponse {
  data: any;
}

export interface UpdateConceptDataRequest {
  board_id: number;
  data: any;
}

// !----- UPDATE ----

export interface UpdateConceptRequest {
  board: Pick<ConceptBoardEncoded, 'name' | 'id'>;
}

// !----- delete ----

export interface DeleteConceptsRequest {
  board_id: number;
}
