import { Injectable } from '@nestjs/common'
import { InjectRedis } from '@nestjs-modules/ioredis'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  private static readonly DEFAULT_EXPIRE = 60 * 60 * 24 // 1 day

  async set(key: string, value: string, expire?: number): Promise<'OK' | undefined> {
    try {
      if (expire) {
        return await this.redis.set(key, value, 'EX', expire)
      }
      return await this.redis.set(key, value, 'EX', RedisService.DEFAULT_EXPIRE)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key).catch((e) => {
      console.error(e)
      throw e
    })
  }

  async quit() {
    await this.redis.quit()
  }
}
