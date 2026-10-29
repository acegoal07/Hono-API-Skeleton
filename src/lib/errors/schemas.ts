import { z } from '@hono/zod-openapi';

/**
 * Bad request error schema for open API docs
 */
export const BadRequestErrorSchema = {
   400: {
      description: 'Bad Request',
      content: {
         'application/json': {
            schema: z.object({
               error: z.literal('BAD_REQUEST'),
               message: z.union([z.literal('The request was malformed'), z.string()])
            })
         }
      }
   }
};

/**
 * Unauthorised error schema for open API docs
 */
export const UnauthorisedErrorSchema = {
   401: {
      description: 'Unauthorised',
      content: {
         'application/json': {
            schema: z.object({
               error: z.literal('UNAUTHORISED'),
               message: z.union([z.literal('The request credentials are incorrect'), z.string()])
            })
         }
      }
   }
};

/**
 * Forbidden error schema for open API docs
 */
export const ForbiddenErrorSchema = {
   403: {
      description: 'Forbidden',
      content: {
         'application/json': {
            schema: z.object({
               error: z.literal('FORBIDDEN'),
               message: z.union([z.literal('Access denied'), z.string()])
            })
         }
      }
   }
};

/**
 * Not found error schema for open API docs
 */
export const NotFoundErrorSchema = {
   404: {
      description: 'Resource not found',
      content: {
         'application/json': {
            schema: z.object({
               error: z.literal('NOT_FOUND'),
               message: z.union([z.literal('The requested resource does not exist'), z.string()])
            })
         }
      }
   }
};

/**
 * Conflict error schema for open API docs
 */
export const ConflictErrorSchema = {
   409: {
      description: 'Resource already exists',
      content: {
         'application/json': {
            schema: z.object({
               error: z.literal('CONFLICTING_RESOURCE'),
               message: z.union([
                  z.literal('There is already a resource in the database'),
                  z.string()
               ])
            })
         }
      }
   }
};

/**
 * Too many requests error schema for open API docs
 */
export const TooManyRequestsErrorSchema = {
   429: {
      description: 'Too many requests sent',
      content: {
         'application/json': {
            schema: z.object({
               error: z.literal('TOO_MANY_REQUESTS'),
               message: z.union([z.literal('Too many requests sent'), z.string()])
            })
         }
      }
   }
};

/**
 * Internal server error schema for open API docs
 */
export const InternalServerErrorSchema = {
   500: {
      description: 'Internal server error',
      content: {
         'application/json': {
            schema: z.object({
               error: z.literal('INTERNAL_SERVER_ERROR'),
               message: z.literal('An unexpected error occurred')
            })
         }
      }
   }
};

/**
 * Service unavailable error schema for open API docs
 */
export const ServiceUnavailableErrorSchema = {
   503: {
      description: 'Service unavailable error',
      content: {
         'application/json': {
            schema: z.object({
               error: z.literal('SERVICE_UNAVAILABLE'),
               message: z.union([z.literal('Service temporarily unavailable'), z.string()])
            })
         }
      }
   }
};
