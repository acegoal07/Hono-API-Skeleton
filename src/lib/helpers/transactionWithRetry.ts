import { randomInt } from 'node:crypto';

import { Prisma } from '@prisma/client';

import { prisma } from '../prisma';

/**
 * Sleeps for a certain amount of time
 * @param ms The amount of milliseconds to sleep for
 * @returns A promise to show that the sleep has finished
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Adds a retry function to prisma transactions so they will retry if they fail
 * @param operation The transactions to perform with the database
 * @param maxRetries How many times to retry the transaction
 * @returns The data returned by the transaction
 */
export async function transactionWithRetry<T>(
   operation: (tx: Prisma.TransactionClient) => Promise<T>,
   {
      maxRetries = 5,
      isolationLevel
   }: {
      maxRetries?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
   } = {}
): Promise<T> {
   const execute = async (attempt: number): Promise<T> => {
      try {
         return await prisma.$transaction(operation, {
            maxWait: 10000,
            timeout: 15000,
            isolationLevel: isolationLevel
         });
      } catch (error) {
         const isRetryable =
            error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034';

         if (!isRetryable || attempt >= maxRetries) {
            throw error;
         }

         await sleep(50 * 2 ** (attempt - 1) + randomInt(0, 50));

         return execute(attempt + 1);
      }
   };

   return execute(0);
}
