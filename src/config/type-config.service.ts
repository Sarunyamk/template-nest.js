import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './env.validation';

@Injectable()
export class TypeConfigService {
  constructor(private readonly configService: ConfigService) {}

  get<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
    return this.configService.get<EnvConfig[K]>(key as string) as EnvConfig[K];
  }
}
