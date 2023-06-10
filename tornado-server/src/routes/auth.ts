import { Application } from 'express';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as crypto from 'crypto';
import {} from '@prisma/client';
import { System } from '../System';

export const setupAuthRoutes = (app: Application, system: System) => {
  passport.use(
    new Strategy(async (username, password, done) => {
      const user = await system.db.user.findUnique({
        where: {
          email: username
        }
      });
      if (!user) {
        done('Authentication failed');
      }

      const hashed = await new Promise<string>(async (resolve, reject) => {
        crypto.pbkdf2(password, user.salt, 1000, 512, 'sha512', (err, hash) => {
          if (err) {
            return reject(err);
          }
          resolve(hash.toString(`hex`));
        });
      });
      if (hashed === user.password) {
        done(null, user);
      }
    })
  );

  app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/');
  });
};
