import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

import APIError, { APIErrorCode } from './apiError';
import {
   badRequestErrorResponse,
   conflictErrorResponse,
   forbiddenErrorResponse,
   internalServerErrorResponse,
   notFoundErrorResponse,
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
         case 400:
            return badRequestErrorResponse(c, error.message);
         case 401:
            return unauthorisedErrorResponse(c, error.message);
         case 403:
            return forbiddenErrorResponse(c, error.message);
         case 404:
            return notFoundErrorResponse(c, error.message);
         case 409:
            return conflictErrorResponse(c, error.message);
         default:
            return internalServerErrorResponse(c, error);
      }
   }

   if (error instanceof APIError) {
      switch (error.code) {
         case APIErrorCode.BadRequest:
            return badRequestErrorResponse(c, error.message);
         case APIErrorCode.Unauthorised:
            return unauthorisedErrorResponse(c, error.message);
         case APIErrorCode.Forbidden:
            return forbiddenErrorResponse(c, error.message);
         case APIErrorCode.NotFound:
            return notFoundErrorResponse(c, error.message);
         case APIErrorCode.Conflict:
            return conflictErrorResponse(c, error.message);
         default:
            return internalServerErrorResponse(c, error.error);
      }
   }

   return internalServerErrorResponse(c, error);
}
