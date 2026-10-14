import type { MiddlewareHandler } from 'hono';

const MAX_STRING_LENGTH = 100;

const SENSITIVE_KEYS = new Set([
   'password',
   'passwords',
   'secret',
   'token',
   'accesstoken',
   'refreshtoken',
   'apikey',
   'authorization'
]);

function truncate(value: unknown): unknown {
   if (typeof value === 'string') {
      if (value.length <= MAX_STRING_LENGTH) {
         return value;
      }

      return `${value.slice(0, MAX_STRING_LENGTH)}... [truncated]`;
   }

   if (Array.isArray(value)) {
      return value.map(truncate);
   }

   if (value !== null && typeof value === 'object') {
      return Object.fromEntries(
         Object.entries(value).map(([key, value]) => [
            key,
            SENSITIVE_KEYS.has(key.toLowerCase()) ? '*********' : truncate(value)
         ])
      );
   }

   return value;
}

export const debugLogger: MiddlewareHandler = async (c, next) => {
   const start = performance.now();
   let body: unknown = undefined;

   const contentType = c.req.header('content-type') ?? '';

   try {
      const request = c.req.raw.clone();

      if (contentType.includes('application/json')) {
         body = truncate(await request.json());
      } else if (contentType.includes('multipart/form-data')) {
         const formData = await request.formData();

         body = truncate(
            Object.fromEntries(
               [...formData.entries()].map(([key, value]) => [
                  key,
                  value instanceof File
                     ? {
                          type: 'file',
                          name: value.name,
                          size: value.size,
                          contentType: value.type
                       }
                     : value
               ])
            )
         );
      }
   } catch {
      body = '<invalid body>';
   }

   await next();

   const lines = [
      `→ ${c.req.method} ${c.req.path}`,
      `Body: ${body !== undefined ? JSON.stringify(body, null, 2) : '<none>'}`,
      `← ${c.res.status} ${Math.round(performance.now() - start)}ms`
   ];

   console.log(`\n${lines.join('\n')}\n`);
};
