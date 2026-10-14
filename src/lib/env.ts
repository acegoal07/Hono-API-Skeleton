import 'dotenv/config';

import { z } from '@hono/zod-openapi';

const envSchema = z.object({
   PORT: z.coerce.number().int().min(1).max(65535).default(3000),
   DB_HOST: z.string().default('localhost'),
   DB_NAME: z.string().default('bank'),
   DB_USERNAME: z.string().default('banker'),
   DB_PASSWORD: z.string().default('mypassword'),
   DB_PORT: z.coerce.number().int().min(1).max(65535).default(3306)
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
