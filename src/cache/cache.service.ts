import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) readonly cacheManager: Cache) {}

  async getCache<T>(key: string, requestFunction: () => Promise<T>) {
    const getCachedData: T = await this.cacheManager.get(key);

    if (getCachedData) {
      return getCachedData;
    }

    const getData: T = await requestFunction();

    this.cacheManager.set(key, getData);

    return getData;
  }
}
