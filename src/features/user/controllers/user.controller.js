import StatusCodeEnum from "../../../common/enums/statusCode.enum.js";
import UserService from "../services/user.service.js";

class UserController {
  /**
   * @param userService default UserService
   * @function constructor
   * @description constructor function to create new instance with different dependencies if i will not use the singleton instance
   * @memberof UserController
   */
  constructor(userService = UserService.getInstance()) {
    this.userService = userService;
  }

  /**
   * @function getInstance
   * @description static function to be called to return an instance as singleton
   * @return UserService
   * @memberof UserService
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserController();
    }

    return this.instance;
  }

  async create(req, res, next) {
    try {
      const data = await this.userService.create(req.body);

      res.sendSuccess({ data, statusCode: StatusCodeEnum.CREATED, message: "user created successfully" });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const data = await this.userService.update(req.params.id, req.body);

      res.sendSuccess({ data, message: "user updated successfully" });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const data = await this.userService.delete(req.params.id);

      res.sendSuccess({ data, message: "user deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;

