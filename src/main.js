require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const { ReqCtx } = require('./common/middlewares/req-ctx.middleware');
const { LoggerMiddleware } = require('./common/middlewares/logger.middleware');
const { ErrorHandler } = require('./common/middlewares/error-handler.middleware');
const { Logger } = require('./common/logger/logger');
const sequalize = require('./common/models/db.connection');

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
  app.use(cors({ origin: '* ' }));
  app.use(helmet());
  app.use(limiter);
  app.use(express.json());
  app.use(ReqCtx);
  app.use(LoggerMiddleware);


  app.use(authController);
  app.use(ErrorHandler); // should be registered last

  app.listen(NODE_PORT, () => {
    logger.info(`Server is Running at: http://localhost:${NODE_PORT}`);
  });
}

main();
