/**
 * Creates the pagination options
 * @param page The current page
 * @param limit How many items to return
 * @returns The pagination options
 */
export function paginationOptions(page: number, limit: number): { skip: number; take: number } {
   return {
      skip: (page - 1) * limit,
      take: limit
   };
}

/**
 * Serializes the pagination information
 * @param page The current page
 * @param limit How many items to return
 * @param itemCount How many items were retrieved
 * @param itemTotal How many items are in the database
 * @returns The serialized pagination information
 */
export function serializePagination(
   page: number,
   limit: number,
   itemCount: number,
   itemTotal: number
): {
   currentPage: number;
   totalPages: number;
   limit: number;
   itemCount: number;
   itemTotal: number;
} {
   return {
      currentPage: page,
      totalPages: Math.ceil(itemTotal / limit),
      limit: limit,
      itemCount: itemCount,
      itemTotal: itemTotal
   };
}
