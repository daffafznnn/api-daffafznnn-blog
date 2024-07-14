import { PrismaClient } from '@prisma/client';
import { config as dotenvConfig } from 'dotenv';

// Load environment variables from .env file
dotenvConfig();

// Prisma Client initialization
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Enable logging for debugging
});

// Function to ensure that the Prisma Client is connected
async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

// Function to handle graceful shutdown
async function shutdown() {
  console.log('Shutting down Prisma Client');
  await prisma.$disconnect();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Connect to the database on initialization
connectToDatabase();

export { prisma };
