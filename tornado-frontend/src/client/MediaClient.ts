import { BaseObserver, FileData, GetMediaRequest, MediaSize, Routes } from '@projectstorm/tornado-common';
import * as _ from 'lodash';
import { ENV } from '../Env';

export interface MediaUploadListener {
  progressChanged: (percent: number) => any;
  finished: (data: FileData) => any;
}

export class MediaUpload extends BaseObserver<MediaUploadListener> {
  xhr: XMLHttpRequest;

  constructor(protected file: File) {
    super();
    this.xhr = new XMLHttpRequest();
    this.xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        this.iterateListeners((cb) => cb.progressChanged?.((event.loaded / event.total) * 100));
      }
    });
    this.xhr.addEventListener('loadend', (event) => {
      this.iterateListeners((cb) => cb.progressChanged?.(100));
    });

    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState === 4) {
        this.iterateListeners((cb) => cb.finished(JSON.parse(this.xhr.response)));
      }
    };
  }

  send(url: string) {
    this.xhr.open('POST', url, true);
    this.xhr.setRequestHeader('Content-Type', 'application/octet-stream');

    const formData = new FormData();
    formData.append('file', this.file);

    this.xhr.send(this.file);
  }
}

export class MediaObject {
  cache: Map<MediaSize, Promise<string>>;

  constructor(protected id: number, protected client: MediaClient) {
    this.cache = new Map();
  }

  clearCachesSizes() {
    _.forEach(MediaSize, (m) => {
      if (m !== MediaSize.ORIGINAL) {
        this.cache.delete(m);
      }
    });
  }

  async getURL(size: MediaSize) {
    if (!this.cache.has(size)) {
      this.cache.set(
        size,
        this.client.getMedia(this.id, size).then((data) => window.URL.createObjectURL(data))
      );
    }
    return this.cache.get(size);
  }
}

export interface MediaClientOptions {
  baseURL: string;
}

export class MediaClient {
  cache: Map<number, MediaObject>;

  constructor(protected options: MediaClientOptions) {
    this.cache = new Map();
  }

  uploadMedia(file: File) {
    const media = new MediaUpload(file);
    media.send(`${this.options.baseURL}${Routes.UPLOAD_MEDIA}`);
    return media;
  }

  getMediaObject(image: number) {
    if (!this.cache.has(image)) {
      this.cache.set(image, new MediaObject(image, this));
    }
    return this.cache.get(image);
  }

  async getMedia(image: number, size: MediaSize) {
    const res = await fetch(`${this.options.baseURL}${Routes.MEDIA_GET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: image,
        size: size
      } as GetMediaRequest)
    });

    if (res.status == 403) {
      window.location.replace(ENV.site_url);
      return null;
    }

    return await res.blob();
  }
}
