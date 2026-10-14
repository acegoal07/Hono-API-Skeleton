// CREATE HONO
import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
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

// CREATE ENDPOINT DOCS
hono.get('/api/v1/openapi.json', (c) => {
   return c.json(
      v1.getOpenAPI31Document({
         openapi: '3.1.0',
         info: {
            title: 'Hono API Skeleton',
            version: '1.0.0'
         },
         servers: [
            {
               url: '/api/v1'
            }
         ]
      })
   );
});

// HOST API DOCS
hono.get(
   '/api/v1/docs',
   Scalar({
      pageTitle: 'Hono API Skeleton',
      url: '/api/v1/openapi.json'
   })
);

// HANDLE ERRORS
hono.onError((error, c) => handleErrors(c, error));

serve({
   fetch: hono.fetch,
   port: env.PORT
});
