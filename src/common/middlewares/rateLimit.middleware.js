import rateLimit from "express-rate-limit";
import envConfig from "../config/env.config.js";

// Define rate limit middleware
export default rateLimit({
  windowMs: 60 * envConfig.RATE_TTL, // 1000 for 1 min
  max: envConfig.RATE_LIMIT, // Max requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

