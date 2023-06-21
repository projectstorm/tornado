export enum MediaSize {
  SMALL = 0,
  MEDIUM = 1,
  LARGE = 2,
  ORIGINAL = 3
}

export interface GetMediaRequest {
  image: number;
  size: MediaSize;
}
