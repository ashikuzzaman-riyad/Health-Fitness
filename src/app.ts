import express, { Application } from "express";
import dotenv from "dotenv";
import routes from "./routers";
import { applyGlobalMiddleware, globalErrorHandler } from "./middlewares";

dotenv.config();

const app: Application = express();

// Global middleware
applyGlobalMiddleware(app);

// All API routes
app.use("/api", routes);

// home
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

// Global error handler (ALWAYS LAST)
app.use(globalErrorHandler);

export default app;
