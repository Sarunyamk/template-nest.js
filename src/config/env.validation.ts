import { Logger } from '@nestjs/common';
import { z } from 'zod/v4';

export const envSchema = z.object({
  API_PORT: z.coerce.number().default(4000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  DATABASE_URL: z.url(),

  JWT_SECRET: z.string().min(32),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL: z.string().default('7d'),
  SALT_ROUNDS: z.coerce.number().default(10),

  ALLOWED_ORIGINS: z.string().default('http://localhost:4000'),

  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),

  SEED_ADMIN_EMAIL: z.email().optional(),
  SEED_ADMIN_PASSWORD: z.string().min(8).optional(),
});

export type EnvConfig = z.infer<typeof envSchema>;

export const validate = (config: Record<string, any>) => {
  const { data, success, error } = envSchema.safeParse(config);
  if (!success) {
    const logger = new Logger('Envvalidation');
    logger.error(`ENV Validation failed \n${z.prettifyError(error)}`);
    process.exit(1);
  }
  return data;
};
