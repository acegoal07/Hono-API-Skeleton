import 'dotenv/config';

import { z } from '@hono/zod-openapi';

/**
 * The APIs configuration data
 */
export const env = z
   .object({
      PORT: z.coerce.number().int().min(1).max(65535).default(3000),
      DB_HOST: z.string().default('api_database'),
      DB_NAME: z.string().default('testdb'),
      DB_USERNAME: z.string().default('api'),
      DB_PASSWORD: z.string().default('mypassword'),
      DB_PORT: z.coerce.number().int().min(1).max(65535).default(3306)
   })
   .parse(process.env);
