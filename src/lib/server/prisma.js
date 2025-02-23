import { PrismaClient } from '@prisma/client';

// Prisma 클라이언트 인스턴스를 생성하고 내보냅니다
const prisma = new PrismaClient();

export { prisma };
