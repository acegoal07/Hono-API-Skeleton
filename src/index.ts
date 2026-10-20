// CREATE HONO
import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import { trimTrailingSlash } from 'hono/trailing-slash';

import v1 from './api/v1';
import { env } from './lib/env';
import handleErrors from './lib/errors/errorHandler';
import { debugLogger } from './lib/middleware/debugLogger';

// CREATE HONO
const hono = new OpenAPIHono();

// LOAD MIDDLEWARE
hono.use(
   '*',
   cors({
      allowMethods: ['POST', 'GET', 'DELETE', 'PATCH', 'OPTIONS']
   })
);
hono.use('*', trimTrailingSlash());
hono.use('*', compress());
hono.use('*', debugLogger);

// LOAD V1 ENDPOINTS
hono.route('/api/v1', v1);

// HANDLE ERRORS
hono.onError((error, c) => handleErrors(c, error));

serve({
   fetch: hono.fetch,
   port: env.PORT
});
