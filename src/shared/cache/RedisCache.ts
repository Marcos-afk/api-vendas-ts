/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache/cache';

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    console.log(`Key : ${key} || Value : ${value}`);
  }

  //public async recover<T>(key: string): Promise<T | null> {}

  //public async invalidate(key: string): Promise<void> {}
}
