import ErrorClass from "../../../common/classes/error.class.js";
import StatusCodeEnum from "../../../common/enums/statusCode.enum.js";
import DatabaseOrderByEnum from "../../../common/enums/databaseOrderBy.enum.js";
import { getTakeAndSkipPaginationOptions, getTotalPageNumbers } from "../../../common/utils/helper.util.js";
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

  async findAll(paginationData) {
    // prepare take, skip option for query
    const { take, skip } = getTakeAndSkipPaginationOptions(paginationData.page, paginationData.perPage);

    const users = await this.userRepository.findAll({
      take,
      skip,
      select: { id: true, name: true, email: true, country: true, mobile: true, age: true },
      orderBy: { createdAt: DatabaseOrderByEnum.DESC },
    });

    // countr users to calculate total pages number
    const usersCount = await this.userRepository.count({});

    const totalPages = getTotalPageNumbers(usersCount, paginationData.perPage);

    return { totalPages, users };
  }
}

export default UserService;

