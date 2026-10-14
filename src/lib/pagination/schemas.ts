import { z } from '@hono/zod-openapi';

/**
 * Pagination request param schema
 */
export const PaginationParamsSchema = {
   page: z.coerce
      .number({ error: 'Page must be a number' })
      .int({ error: 'Page must be a whole number' })
      .min(1, { error: 'Page must be more than 0' })
      .default(1)
      .meta({
         description: 'The page number for the pagination',
         example: '1'
      }),
   limit: z.coerce
      .number({ error: 'Limit must be a number' })
      .int({ error: 'Limit must be a whole number' })
      .positive({ error: 'Limit must be more than 0' })
      .max(100, { error: 'Limit has a max of 100' })
      .default(25)
      .meta({
         description: 'How many items to retrieve',
         example: '40'
      })
};

/**
 * The pagination schema for the response
 * @param schema The paginated schema response
 * @returns The schema
 */
export const PaginationResponseSchema = <T extends z.ZodType>(schema: T) => {
   return z.object({
      data: z.array(schema).meta({ description: 'The paginated data from the API' }),
      currentPage: z.number().meta({ description: 'The current page of the pagination' }),
      totalPages: z.number().meta({ description: 'The total number of pages that are available' }),
      limit: z.number().meta({ description: 'How many items will be returned by the get' }),
      itemCount: z.number().meta({ description: 'How many items have been returned by this page' }),
      itemTotal: z.number().meta({ description: 'How many there are to be displayed' })
   });
};
