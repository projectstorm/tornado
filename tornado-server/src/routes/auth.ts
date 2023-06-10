import { Application } from 'express';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { System } from '../System';
import { User } from '@projectstorm/tornado-common';

export const setupAuthRoutes = (app: Application, system: System) => {
  passport.use(
    new Strategy(async (username, password, done) => {
      try {
        const authenticated = await system.users.authenticateUser(username, password);
        if (authenticated) {
          return done(null, {
            id: authenticated.id,
            email: authenticated.email,
            name: authenticated.name
          });
        }
      } catch (ex) {
        system.logger.error(`Something went wrong authenticating user ${username}`, ex);
      }
      done('Authentication failed');
    })
  );

  passport.serializeUser((user, cb) => {
    process.nextTick(function () {
      return cb(null, {
        id: user.id
      });
    });
  });

  passport.deserializeUser((user: User, cb) => {
    process.nextTick(() => {
      return cb(null, user);
    });
  });

  app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/');
  });
};
