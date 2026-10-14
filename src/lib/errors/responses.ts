import { Context } from 'hono';

/**
 * Responds with a bad request error
 * @param {Context} c The hono context
 * @param {string} message The error message to go with the not found
 * @returns The response function
 */
export function badRequestErrorResponse(c: Context, message?: string) {
   return c.json(
      {
         error: 'BAD_REQUEST' as const,
         message: message || ('The request was malformed' as const)
      },
      400
   );
}

/**
 * Responds with a unauthorised error
 * @param {Context} c The hono context
 * @param {string} message The error message to go with the unauthorised
 * @returns The response function
 */
export function unauthorisedErrorResponse(c: Context, message?: string) {
   return c.json(
      {
         error: 'UNAUTHORISED' as const,
         message: message || ('The request credentials are incorrect' as const)
      },
      401
   );
}

/**
 * Responds with a forbidden error
 * @param {Context} c The hono context
 * @param {string} message The error message to go with the unauthorised
 * @returns The response function
 */
export function forbiddenErrorResponse(c: Context, message?: string) {
   return c.json(
      {
         error: 'FORBIDDEN' as const,
         message: message || ('Access denied' as const)
      },
      401
   );
}

/**
 * Responds with a not found error response
 * @param {Context} c The hono context
 * @param {string} message The error message to go with the not found
 * @returns The response function
 */
export function notFoundErrorResponse(c: Context, message?: string) {
   return c.json(
      {
         error: 'NOT_FOUND' as const,
         message: message || ('The requested resource does not exist' as const)
      },
      404
   );
}

/**
 * Responds with a conflict error response
 * @param {Context} c The hono context
 * @param {string} message The error message to go with the not found
 * @returns The response function
 */
export function conflictErrorResponse(c: Context, message?: string) {
   return c.json(
      {
         error: 'CONFLICTING_RESOURCE' as const,
         message: message || ('There is already a resource in the database' as const)
      },
      409
   );
}

/**
 * Responds with an internal server error response
 * @param {Context} c The hono context
 * @param {unknown} error The error it self
 * @returns The response function
 */
export function internalServerErrorResponse(c: Context, error: unknown) {
   console.log(error);

   return c.json(
      {
         error: 'INTERNAL_SERVER_ERROR' as const,
         message: 'An unexpected error occurred' as const
      },
      500
   );
}
