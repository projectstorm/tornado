export interface ConceptBoard {
  id: number;
  name: string;
}

export interface ConceptsRequest {
  user_id: number;
}

export interface ConceptsResponse {
  concepts: ConceptBoard[];
}

export type CreateConceptRequest = Pick<ConceptBoard, 'name'>;

export interface CreateConceptResponse {
  concept: ConceptBoard;
}
