import { Context } from 'hono';

import { HTTPExceptionCodes } from './enums';

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
      HTTPExceptionCodes.BadRequest
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
      HTTPExceptionCodes.Unauthorised
   );
}

/**
 * Responds with a forbidden error
 * @param c The hono context
 * @param message The error message to go with the forbidden error
 * @returns The response function
 */
export function forbiddenErrorResponse(c: Context, message?: string) {
   return c.json(
      {
         error: 'FORBIDDEN' as const,
         message: message || ('Access denied' as const)
      },
      HTTPExceptionCodes.Forbidden
   );
}

/**
 * Responds with a not found error response
 * @param c The hono context
 * @param message The error message to go with the not found
 * @returns The response function
 */
export function notFoundErrorResponse(c: Context, message?: string) {
   return c.json(
      {
         error: 'NOT_FOUND' as const,
         message: message || ('The requested resource does not exist' as const)
      },
      HTTPExceptionCodes.NotFound
   );
}

/**
 * Responds with a conflict error response
 * @param c The hono context
 * @param message The error message to go with the conflict error
 * @returns The response function
 */
export function conflictErrorResponse(c: Context, message?: string) {
   return c.json(
      {
         error: 'CONFLICTING_RESOURCE' as const,
         message: message || ('There is already a resource in the database' as const)
      },
      HTTPExceptionCodes.Conflict
   );
}

/**
 * Responds with a too many requests error response
 * @param {Context} c The hono context
 * @param {string} message The error message to go with the not found
 * @returns The response function
 */
export function tooManyRequestsErrorResponse(c: Context, message?: string) {
   return c.json(
      {
         error: 'TOO_MANY_REQUESTS',
         message: message || ('Too many requests sent' as const)
      },
      HTTPExceptionCodes.TooManyRequest
   );
}

/**
 * Responds with an internal server error response
 * @param c The hono context
 * @param error The error it self
 * @returns The response function
 */
export function internalServerErrorResponse(c: Context, error: unknown) {
   console.log(error);

   return c.json(
      {
         error: 'INTERNAL_SERVER_ERROR' as const,
         message: 'An unexpected error occurred' as const
      },
      HTTPExceptionCodes.InternalServerError
   );
}

/**
 * Responds with an service unavailable error response
 * @param {Context} c The hono context
 * @param {string} message The message for the error
 * @returns The response function
 */
export function serviceUnavailableErrorResponse(c: Context, message?: string) {
   return c.json(
      {
         error: 'SERVICE_UNAVAILABLE' as const,
         message: message || ('Service temporarily unavailable' as const)
      },
      HTTPExceptionCodes.ServiceUnavailable
   );
}
