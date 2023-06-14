import { AbstractApi } from './AbstractApi';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { ENV } from '../Env';
import * as path from 'path';
import { System } from '../System';
import { User } from '@prisma/client';

export class MediaApi extends AbstractApi {
  constructor(system: System) {
    super({
      name: 'MEDIA',
      system
    });
  }

  async uploadFile(user: User, file: Buffer) {
    const media = await this.system.db.media.create({
      data: {
        userId: user.id
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

    // resize
    const sizes = [200, 500, 1000];
    for (let size of sizes) {
      try {
        this.logger.info(`resizing to ${size}`);
        await sharp(file)
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
          .jpeg()
          .toFile(path.join(this.resizeDir, `${media.id}.${size}.jpg`));
      } catch (ex) {
        this.logger.error(`failed to resize original to ${size}`, ex);
      }
    }
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
