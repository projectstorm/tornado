export enum MediaSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  X_LARGE = 'x_large',
  ORIGINAL = 'original'
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
