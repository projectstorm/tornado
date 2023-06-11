import { Application, Request, Response } from 'express';
import * as _ from 'lodash';
import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { CheerioAPI } from 'cheerio';
import * as express from 'express';
import * as path from 'path';

const readFileCached = _.memoize(async (fileName: string) => {
  return await fs.promises.readFile(fileName, 'utf8');
});

export interface SetupHtmlRoutesOptions {
  indexFilePath: string;
  patch: (req: Request, cheerio: CheerioAPI) => Promise<any>;
}

export const createHtmlInjectorMiddleware = async (options: SetupHtmlRoutesOptions) => {
  const data = await readFileCached(options.indexFilePath);
  return async (req: Request, res: Response, next) => {
    const loaded = cheerio.load(data);
    await options.patch(req, loaded);
    res.setHeader('Content-Type', 'text/html');
    res.send(loaded.html());
    res.end();
  };
};

export const setupStaticMiddleware = async (app: Application, staticPath: string) => {
  app.use(
    '/',
    express.static(staticPath, {
      index: false
    })
  );
  app.use(
    '/',
    await createHtmlInjectorMiddleware({
      indexFilePath: path.join(staticPath, 'index.html'),
      patch: async (req, $) => {
        if (req.user) {
          const script = `window.env=${JSON.stringify({
            user: req.user
          })}`;
          $('head').append(`<script>${script}</script>`);
        }
      }
    })
  );
};
