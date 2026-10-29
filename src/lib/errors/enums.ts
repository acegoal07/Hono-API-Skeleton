/**
 * The available API error responses
 */
export enum HTTPExceptionCodes {
   BadRequest = 400,
   Unauthorised = 401,
   Forbidden = 403,
   NotFound = 404,
   Conflict = 409,
   TooManyRequest = 429,
   InternalServerError = 500,
   ServiceUnavailable = 503
}
