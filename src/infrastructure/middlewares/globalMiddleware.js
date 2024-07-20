import createError from "http-errors";
import logger from "../utils/Logger.js";
import baseRouter from "../routes/baseRoute.js";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import cors from "cors";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

// Middleware untuk logging request
const requestLogger = (req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
};

// Middleware untuk penanganan error
const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);

  // Mengirimkan respons error ke klien
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// Middleware untuk menangani 404 Not Found
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Not Found"));
};

// Menggabungkan semua middleware
const globalMiddleware = (app) => {

  app.use(cors());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(fileUpload());

  app.use(requestLogger); // Logging request

  // Routes
  app.use("/api/v1", baseRouter);
  
  app.use("/hello", (req, res) => {
    res.send("Hello World!");
  });

  // Menangani 404 setelah semua rute
  app.use(notFoundHandler); 

  // Menangani error setelah 404 handler
  app.use(errorHandler); 
};

export default globalMiddleware;