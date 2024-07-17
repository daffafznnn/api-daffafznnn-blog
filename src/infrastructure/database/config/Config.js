import { PrismaClient } from "@prisma/client";
import { config as dotenvConfig } from "dotenv";

// Determine the environment and load the corresponding .env file
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenvConfig({ path: envFile });

// Prisma Client initialization
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // Enable logging for debugging
});

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;

  try {
    await prisma.$connect();
    console.log("Database connection established successfully");
    isConnected = true;
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

async function disconnectFromDatabase() {
  if (!isConnected) return;

  try {
    console.log("Shutting down Prisma Client");
    await prisma.$disconnect();
    isConnected = false;
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
}

// Register shutdown handlers
const shutdown = async () => {
  await disconnectFromDatabase();
  process.exit(0); // Exit process after disconnecting
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export { prisma, connectToDatabase, disconnectFromDatabase };
