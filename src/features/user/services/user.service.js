import ErrorClass from "../../../common/classes/error.class.js";
import StatusCodeEnum from "../../../common/enums/statusCode.enum.js";
import UserRepository from "../repositories/user.repository.js";

class UserService {
  /**
   * @function constructor
   * @param userRepository default UserRepository
   * @description constructor function to create new instance with different dependencies if i will not use the singleton instance
   * @memberof UserService
   */
  constructor(userRepository = UserRepository.getInstance()) {
    this.userRepository = userRepository;
  }

  /**
   * @function getInstance
   * @description static function to return an instance as singleton
   * @return UserRepository
   * @memberof UserService
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }

    return this.instance;
  }

  async create(data) {
    const user = {
      email: data.email,
      name: data.name,
      country: data.country,
      age: Number(data.age),
      mobile: data.mobile,
    };

    return await this.userRepository.create({ data: user, select: { id: true } });
  }

  async update(userId, data) {
    const where = { id: userId };

    const user = await this.userRepository.findOne({ select: { id: true }, where });

    if (!user) {
      throw new ErrorClass(StatusCodeEnum.NOT_FOUND, "user not found");
    }

    const userData = {
      email: data.email,
      name: data.name,
      country: data.country,
      age: Number(data.age),
      mobile: data.mobile,
    };

    return await this.userRepository.update({ data: userData, select: { id: true }, where });
  }

  async delete(userId) {
    const where = { id: userId };

    const user = await this.userRepository.findOne({ select: { id: true }, where });

    if (!user) {
      throw new ErrorClass(StatusCodeEnum.NOT_FOUND, "user not found");
    }

    return await this.userRepository.delete({ select: { id: true }, where });
  }
}

export default UserService;

