/**
 * The available API error responses
 */
export enum APIErrorCode {
   BadRequest = 400,
   Unauthorised = 401,
   Forbidden = 403,
   NotFound = 404,
   Conflict = 409,
   InternalServerError = 500
}

/**
 * The API error class to be thrown
 */
export default class APIError extends Error {
   /**
    * The Status code of the error
    */
   public code: APIErrorCode;

   /**
    * The error message
    */
   public error: unknown | undefined;

   /**
    * Context for the error message used within larger operations
    */
   public context: string | undefined;

   /**
    * Creates the APIError
    * @param code The status code
    * @param options The additional parts of the API error
    */
   constructor(code: APIErrorCode, options: { message?: string; error?: unknown } = {}) {
      super(options.message);

      this.name = 'APIError';
      this.code = code;
      this.error = options.error;
   }
}
