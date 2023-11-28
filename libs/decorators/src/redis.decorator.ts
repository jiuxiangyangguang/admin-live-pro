import { RedisCacheService } from '@app/redis/redis-cache/redis-cache.service'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  SetMetadata,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'

export const Cacheable = (key: string, ttl: number) =>
  SetMetadata('cache', { key, ttl })

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private cacheManager: RedisCacheService,
    private reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const cacheMetadata = this.reflector.get<{ key: string; ttl: number }>(
      'cache',
      context.getHandler(),
    )
    if (!cacheMetadata) {
      return next.handle()
    }

    const { key, ttl } = cacheMetadata

    const value = await this.cacheManager.cacheGet(key)
    if (value) {
      return of(JSON.parse(value))
    }

    return next
      .handle()
      .pipe(
        tap((response) =>
          this.cacheManager.cacheSet(key, JSON.stringify(response), ttl),
        ),
      )
  }
}

export function Cached(key: string, ttl: number) {
  return applyDecorators(UseInterceptors(CacheInterceptor), Cacheable(key, ttl))
}
