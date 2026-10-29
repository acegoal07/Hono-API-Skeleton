import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { HTTPExceptionCodes } from './enums';
import {
   badRequestErrorResponse,
   conflictErrorResponse,
   forbiddenErrorResponse,
   internalServerErrorResponse,
   notFoundErrorResponse,
   serviceUnavailableErrorResponse,
   tooManyRequestsErrorResponse,
   unauthorisedErrorResponse
} from './responses';

/**
 * Handles the error responses by the API in one place
 * @param c The hono context
 * @param error The thrown error so it can be handled
 * @returns The returned error response
 */
export default function handleErrors(c: Context, error: unknown) {
   if (error instanceof HTTPException) {
      switch (error.status) {
         case HTTPExceptionCodes.BadRequest:
            return badRequestErrorResponse(c, error.message);
         case HTTPExceptionCodes.Unauthorised:
            return unauthorisedErrorResponse(c, error.message);
         case HTTPExceptionCodes.Forbidden:
            return forbiddenErrorResponse(c, error.message);
         case HTTPExceptionCodes.NotFound:
            return notFoundErrorResponse(c, error.message);
         case HTTPExceptionCodes.TooManyRequest:
            return tooManyRequestsErrorResponse(c, error.message);
         case HTTPExceptionCodes.Conflict:
            return conflictErrorResponse(c, error.message);
         case HTTPExceptionCodes.ServiceUnavailable:
            return serviceUnavailableErrorResponse(c, error.message);
         default:
            return internalServerErrorResponse(c, error);
      }
   }

   return internalServerErrorResponse(c, error);
}
