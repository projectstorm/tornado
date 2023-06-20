import { BaseObserver, FileData, Routes } from '@projectstorm/tornado-common';

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

export interface MediaClientOptions {
  baseURL: string;
}

export class MediaClient {
  constructor(protected options: MediaClientOptions) {}

  uploadMedia(file: File) {
    const media = new MediaUpload(file);
    media.send(`${this.options.baseURL}${Routes.UPLOAD_MEDIA}`);
    return media;
  }
}
