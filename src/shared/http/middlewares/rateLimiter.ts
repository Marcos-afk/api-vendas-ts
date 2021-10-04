import { Response, Request, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import ErrorApp from '@shared/errors/ErrorApp';

if (!process.env.REDIS_HOST) {
  process.exit(1);
}

const redisHost = process.env.REDIS_HOST;

const RedisClient = redis.createClient(redisHost, {
  tls: {
    rejectUnauthorized: false,
  },
});

const limiter = new RateLimiterRedis({
  storeClient: RedisClient,
  keyPrefix: 'ratelimit',
  points: 1,
  duration: 5,
});

export default async function ratelimiter(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch (error) {
    throw new ErrorApp('Muitos requisições realizadas!', 429);
  }
}
