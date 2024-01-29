import express from "express";
import UserController from "../controllers/user.controller.js";
import validationMiddleware from "../../../common/middlewares/validation.middleware.js";
import parsePaginationQueryMiddleware from "../../../common/middlewares/parsePaginationQuery.middleware.js";
import userSchema from "../schemas/user.schema.js";
import idSchema from "../schemas/id.schema.js";
import basicAuthMiddleware from "../../../common/middlewares/basicAuth.middleware.js";

class UserRoute {
  constructor(userController = UserController.getInstance()) {
    this.router = express.Router();
    this.userController = userController;
    this.setupRoutes();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserRoute();
    }

    return this.instance;
  }

  setupRoutes() {
    // apply routes
    this.router.post("/", validationMiddleware(userSchema), this.userController.create.bind(this.userController));

    this.router.put(
      "/:id",
      validationMiddleware(idSchema, "params"),
      validationMiddleware(userSchema),
      this.userController.update.bind(this.userController)
    );

    this.router.delete(
      "/:id",
      validationMiddleware(idSchema, "params"),
      this.userController.delete.bind(this.userController)
    );

    this.router.get(
      "/",
      basicAuthMiddleware,
      parsePaginationQueryMiddleware,
      this.userController.findAll.bind(this.userController)
    );
  }
}

export default UserRoute.getInstance().router;

