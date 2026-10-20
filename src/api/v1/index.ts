import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';

const hono = new OpenAPIHono();

// Generate OpenAPI documentation
hono.get('/openapi.json', (c) => {
   return c.json(
      hono.getOpenAPI31Document({
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

// Host the documentation
hono.get(
   '/docs',
   Scalar({
      pageTitle: 'Hono API Skeleton',
      url: '/api/v1/openapi.json'
   })
);

export default hono;
