export enum MediaSize {
  SMALL = 0,
  MEDIUM = 1,
  LARGE = 2,
  X_LARGE = 3,
  ORIGINAL = 4
}

export interface GetMediaRequest {
  image: number;
  size: MediaSize;
}

export interface MediaCropRequest {
  image: number;
  top: number;
  left: number;
  width: number;
  height: number;
}
