/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import Redis, { Redis as RedisClient } from 'ioredis';

if (!process.env.REDIS_HOST) {
  process.exit(1);
}

const redisHost = process.env.REDIS_HOST;

class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(redisHost, {
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export default new RedisCache();
