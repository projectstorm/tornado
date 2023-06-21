import { BaseObserver, FileData, GetMediaRequest, MediaSize, Routes } from '@projectstorm/tornado-common';

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
  cache: Map<MediaSize, string>;

  constructor(protected id: number, protected client: MediaClient) {
    this.cache = new Map();
  }

  async getURL(size: MediaSize) {
    if (!this.cache.has(size)) {
      const data = await this.client.getMedia(this.id, size);
      const url = window.URL.createObjectURL(data);
      this.cache.set(size, url);
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
    const res = await fetch(`${this.options.baseURL}${Routes.GET_MEDIA}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: image,
        size: size
      } as GetMediaRequest)
    });
    return await res.blob();
  }
}
