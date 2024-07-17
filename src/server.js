import dotenv from "dotenv";
import express from "express";
import globalMiddleware from "../src/infrastructure/middlewares/globalMiddleware.js";

// Load environment variables based on NODE_ENV
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

const app = express();
let server; // Variabel untuk menyimpan referensi ke server

const startServer = async () => {
  try {
    const { connectToDatabase, disconnectFromDatabase } = await import(
      "./infrastructure/database/config/config.js"
    );
    await connectToDatabase();

    // Middleware
    globalMiddleware(app);

    const PORT = process.env.PORT || 5005;
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle shutdown signals only in development environment
    if (process.env.NODE_ENV === 'development') {
      process.on('SIGINT', async () => {
        console.log('SIGINT signal received: closing HTTP server');
        server.close(async () => {
          console.log('HTTP server closed');
          await disconnectFromDatabase(); // Disconnected from database
          process.exit(0);
        });
      });

      process.on('SIGTERM', async () => {
        console.log('SIGTERM signal received: closing HTTP server');
        server.close(async () => {
          console.log('HTTP server closed');
          await disconnectFromDatabase(); // Disconnected from database
          process.exit(0);
        });
      });
    }

  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();