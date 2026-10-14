import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

import { env } from './env';

const globalForPrisma = globalThis as unknown as {
   prisma: PrismaClient | undefined;
};

const adapter = new PrismaMariaDb({
   host: env.DB_HOST,
   user: env.DB_USERNAME,
   password: env.DB_PASSWORD,
   database: env.DB_NAME,
   port: env.DB_PORT,
   connectionLimit: 10
});

export const prisma =
   globalForPrisma.prisma ??
   new PrismaClient({
      adapter
   });

if (process.env.NODE_ENV !== 'production') {
   globalForPrisma.prisma = prisma;
}
