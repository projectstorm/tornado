import { AbstractApi } from './AbstractApi';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { ENV } from '../Env';
import * as path from 'path';
import { System } from '../System';
import { User } from '@prisma/client';
import { MediaCropRequest, MediaSize } from '@projectstorm/tornado-common';
import * as crypto from 'crypto';

export class MediaApi extends AbstractApi {
  static SIZES = {
    [MediaSize.SMALL]: 200,
    [MediaSize.MEDIUM]: 500,
    [MediaSize.LARGE]: 1000,
    [MediaSize.X_LARGE]: 2000
  };

  constructor(system: System) {
    super({
      name: 'MEDIA',
      system
    });
  }

  generateChecksum(str: Buffer) {
    return crypto.createHash('md5').update(str).digest('hex');
  }

  async cropMedia(req: MediaCropRequest) {
    this.logger.info(`cropping image ${req.image}`);
    const file = await fs.promises.readFile(this.getMediaPath(req.image, MediaSize.ORIGINAL));
    await this.resizeMedia(file, req.image, req);
  }

  async resizeMedia(file: Buffer, id: number, crop?: { left: number; top: number; width: number; height: number }) {
    for (let k in MediaApi.SIZES) {
      const size = MediaApi.SIZES[k];
      try {
        this.logger.info(`resizing to ${size}`);

        let s = sharp(file);
        if (crop) {
          s = s.extract({
            top: Math.round(crop.top),
            left: Math.round(crop.left),
            width: Math.round(crop.width),
            height: Math.round(crop.height)
          });
        }
        await s
          .resize({
            fit: 'inside',
            background: {
              r: 0,
              g: 0,
              b: 0,
              alpha: 0
            },
            width: size,
            height: size
          })
          .jpeg({
            quality: 100
          })
          .toFile(path.join(this.resizeDir, `${id}.${size}.jpg`));
      } catch (ex) {
        this.logger.error(`failed to resize original to ${size}`, ex);
      }
    }
  }

  getMediaPath(image: number, size: MediaSize) {
    if (size === MediaSize.ORIGINAL) {
      return path.join(this.originalDir, `${image}`);
    }
    return path.join(this.resizeDir, `${image}.${MediaApi.SIZES[size]}.jpg`);
  }

  async uploadFile(user: User, file: Buffer) {
    const meta = await sharp(file).metadata();
    const media = await this.system.db.media.create({
      data: {
        userId: user.id,
        width: meta.width,
        height: meta.height,
        checksum: this.generateChecksum(file)
      }
    });
    try {
      const p = path.join(this.originalDir, `${media.id}`);
      this.logger.info(`Writing file ${p}`);
      await fs.promises.writeFile(p, file);
    } catch (ex) {
      this.logger.error(`failed to upload original, cleaning up`, ex);
      this.system.db.media.delete({
        where: {
          id: media.id
        }
      });
    }

    // resize media but dont crop
    await this.resizeMedia(file, media.id);
    return media;
  }

  get rootDir() {
    return ENV.CONTENT_DIRECTORY;
  }

  get resizeDir() {
    return path.join(this.rootDir, 'resize');
  }

  get originalDir() {
    return path.join(this.rootDir, 'original');
  }

  async exists(path: string) {
    try {
      await fs.promises.access(path);
      return true;
    } catch (ex) {
      return false;
    }
  }

  async ensureDirectory(path: string) {
    if (!(await this.exists(path))) {
      this.logger.info(`Creating directory: ${path}`);
      await fs.promises.mkdir(path, { recursive: true });
    }
  }

  async init() {
    this.logger.debug(`Checking media folders`);
    if (!(await this.exists(this.rootDir))) {
      throw new Error(`missing content directory ${this.rootDir}`);
    }

    await this.ensureDirectory(this.originalDir);
    await this.ensureDirectory(this.resizeDir);
  }
}
