import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  const response: any = {
    success: false,
    message,
  };

  // Include stack trace only in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
    // Include Prisma specific info if available
    if (err.code) response.code = err.code;
    if (err.meta) response.meta = err.meta;
  }

  res.status(status).json(response);
};
