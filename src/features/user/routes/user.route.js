import express from "express";
import UserController from "../controllers/user.controller.js";
import validationMiddleware from "../../../common/middlewares/validation.middleware.js";
import parsePaginationQueryMiddleware from "../../../common/middlewares/parsePaginationQuery.middleware.js";
import userSchema from "../schemas/user.schema.js";
import idSchema from "../schemas/id.schema.js";

class UserRoute {
  constructor(userController) {
    this.router = express.Router();
    this.userController = userController;
    this.setupRoutes();
  }

  static getInstance(userController = UserController.getInstance()) {
    if (!this.instance) {
      this.instance = new UserRoute(userController);
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

    this.router.get("/", parsePaginationQueryMiddleware, this.userController.findAll.bind(this.userController));
  }
}

export default UserRoute.getInstance().router;

