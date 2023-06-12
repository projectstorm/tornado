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

export interface SetupStaticMiddlewareOptions {
  app: Application;
  staticPath: string;
  siteUrl: string;
}

export const setupStaticMiddleware = async (options: SetupStaticMiddlewareOptions) => {
  options.app.use(
    '/',
    express.static(options.staticPath, {
      index: false
    })
  );
  options.app.use(
    '/',
    await createHtmlInjectorMiddleware({
      indexFilePath: path.join(options.staticPath, 'index.html'),
      patch: async (req, $) => {
        // patch script to site url
        $('script').each((i, e) => {
          const script = $(e);
          script.attr('src', `${options.siteUrl}/${script.attr('src')}`);
        });

        const script = `window.env=${JSON.stringify({
          user: req.user || null,
          site_url: options.siteUrl
        })}`;
        $('head').prepend(`<script>${script}</script>`);
      }
    })
  );
};
