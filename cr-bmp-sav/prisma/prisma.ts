import { PrismaClient } from '@prisma/client';

// Utiliser un singleton pour éviter de créer plusieurs instances de PrismaClient en mode développement
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;  // Assigner l'instance de Prisma à l'objet global
}

export default prisma;
