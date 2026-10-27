import { z } from '@hono/zod-openapi';

export const ExampleReturnSchema = z.object({
   text: z.string()
});
