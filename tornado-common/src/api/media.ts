export enum MediaSize {
  SMALL = 0,
  MEDIUM = 1,
  LARGE = 2,
  X_LARGE = 3,
  ORIGINAL = 4
}

export const MEDIA_SIZES = {
  [MediaSize.SMALL]: 200,
  [MediaSize.MEDIUM]: 500,
  [MediaSize.LARGE]: 1000,
  [MediaSize.X_LARGE]: 2000
};

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
