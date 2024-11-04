require('dotenv').config();
require('module-alias/register');

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const { ReqCtx, LoggerMiddleware, ErrorHandler } = require('@middlewares');
const { Logger } = require('@logger');
const sequalize = require('@models/db.connection');

const authController = require('./modules/auth/auth.controller');

/**
 *
 */
async function main() {
  const app = express();
  const logger = new Logger('main');
  const NODE_PORT = process.env.NODE_PORT;

  await sequalize.authenticate();

  const limiter = rateLimit({
    windowMs: 1000,
    max: 25,
    message: { message: 'Too many requests from this IP, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });

  /* register middleware here */
  app.use(cors({ origin: '*' }));
  app.use(helmet());
  app.use(limiter);
  app.use(express.json());
  app.use(ReqCtx);
  app.use(LoggerMiddleware);

  app.use('/auth', authController);
  app.use(ErrorHandler); // should be registered last

  app.listen(NODE_PORT, () => {
    logger.info(`Server is Running at: http://localhost:${NODE_PORT}`);
  });
}

main();
