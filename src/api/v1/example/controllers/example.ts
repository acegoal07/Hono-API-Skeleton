import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';

import { HTTPExceptionCodes } from '../../../../lib/errors/enums';
import {
   BadRequestErrorSchema,
   ConflictErrorSchema,
   ForbiddenErrorSchema,
   InternalServerErrorSchema,
   NotFoundErrorSchema,
   ServiceUnavailableErrorSchema,
   TooManyRequestsErrorSchema,
   UnauthorisedErrorSchema
} from '../../../../lib/errors/schemas';
import { ExampleReturnSchema } from '../lib/schemas';

export default new OpenAPIHono().openapi(
   createRoute({
      method: 'get',
      path: '/',
      description: 'Example endpoint',
      tags: ['Example'],
      responses: {
         200: {
            description: 'Successfully exampled the endpoint',
            content: {
               'application/json': {
                  schema: ExampleReturnSchema
               }
            }
         },
         // All Available error response schemas which have corresponding responders
         ...BadRequestErrorSchema,
         ...UnauthorisedErrorSchema,
         ...ForbiddenErrorSchema,
         ...NotFoundErrorSchema,
         ...ConflictErrorSchema,
         ...TooManyRequestsErrorSchema,
         ...InternalServerErrorSchema,
         ...ServiceUnavailableErrorSchema
      }
   }),
   (c) => {
      // Example of how to throw an API error the enum allows
      // you to select between all the available error responses
      if (false) {
         throw new HTTPException(HTTPExceptionCodes.NotFound, {
            message: 'This is an example error'
         });
      }

      return c.json(
         {
            text: 'Hello World!'
         },
         200
      );
   }
);
