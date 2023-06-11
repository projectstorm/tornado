import { Router } from 'express';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { System } from '../System';
import { LoginResponse, Routes, User } from '@projectstorm/tornado-common';
import * as session from 'cookie-session';
import * as cookieParser from 'cookie-parser';

export const setupAuthRoutes = (router: Router, system: System) => {
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
      system.logger.info(`Authentication failed`);
      done(null, false, {
        message: `Authentication failed`
      });
    })
  );

  passport.serializeUser((user, cb) => {
    process.nextTick(function () {
      return cb(null, user);
    });
  });

  passport.deserializeUser((user: User, cb) => {
    process.nextTick(() => {
      return cb(null, user);
    });
  });

  router.use(cookieParser());
  router.use(
    session({
      name: 'session',
      keys: ['im a fox'],
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
  );
  router.use(passport.initialize());
  router.use(passport.session());

  router.post(Routes.LOGIN, passport.authenticate('local'), (req, res) => {
    res.json({
      user: req.user
    } as LoginResponse);
  });

  router.post(Routes.SIGN_OUT, (req, res, next) => {
    req.session = null;
    res.status(200);
    res.end();
  });
};
