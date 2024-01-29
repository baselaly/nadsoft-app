import express from "express";
import routes from "../config/routes.config.js";
import cors from "cors";
import compression from "compression";
import errorMiddleware from "../middlewares/error.middleware.js";
import successMiddleware from "../middlewares/success.middleware.js";
import requestLoggerMiddleware from "../middlewares/requestLogger.middleware.js";
import rateLimitMiddleware from "../middlewares/rateLimit.middleware.js";

const app = express();

app.use(compression(), cors(), express.json(), express.urlencoded({ extended: false }));

// apply rate limit middleware to all my routes
app.use(rateLimitMiddleware);

// apply all incoming requests logger middleware to all my routes
app.use(requestLoggerMiddleware);

// apply successMiddleware to unify all my responses
app.use(successMiddleware);

// bind my routes
app.use("/api/v1/", routes);

// apply global error handling middleware
app.use(errorMiddleware);

export default app;

