import { Response, Request, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import ErrorApp from '@shared/errors/ErrorApp';

const RedisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
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
