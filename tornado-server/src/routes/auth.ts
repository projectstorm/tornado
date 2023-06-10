import { Application } from 'express';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { System } from '../System';

export const setupAuthRoutes = (app: Application, system: System) => {
  passport.use(
    new Strategy(async (username, password, done) => {
      try {
        const authenticated = await system.users.authenticateUser(username, password);
        if (authenticated) {
          return done(null, authenticated);
        }
      } catch (ex) {
        system.logger.error(`Something went wrong authenticating user ${username}`, ex);
      }
      done('Authentication failed');
    })
  );

  app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/');
  });
};
