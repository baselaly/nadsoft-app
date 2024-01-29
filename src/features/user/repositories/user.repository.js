import DatabaseError from "../../../common/classes/databaseError.class.js";
import PrismaService from "../../../common/services/prisma.service.js";

class UserRepository {
  /**
   * @function constructor
   * @param prismaService default PrismaService
   * @description constructor function to create new instance with different dependencies if i will not use the singleton instance
   * @memberof UserService
   */
  constructor(prismaService = PrismaService.getInstance()) {
    this.prismaService = prismaService;
  }

  /**
   * @function getInstance
   * @description static function to be called to return an instance as singleton
   * @return UserRepository
   * @memberof UserRepository
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserRepository();
    }

    return this.instance;
  }

  async create({ data, select }) {
    try {
      return await this.prismaService.user.create({ data, select });
    } catch (err) {
      throw new DatabaseError(err.code);
    }
  }

  async findOne({ where, select }) {
    try {
      return await this.prismaService.user.findFirst({ where, select });
    } catch (err) {
      throw new DatabaseError(err.code);
    }
  }

  async update({ data, select, where }) {
    try {
      return await this.prismaService.user.update({ data, select, where });
    } catch (err) {
      throw new DatabaseError(err.code);
    }
  }

  async delete({ select, where }) {
    try {
      return await this.prismaService.user.delete({ where, select });
    } catch (err) {
      throw new DatabaseError(err.code);
    }
  }

  async findAll({ where, select, skip, take, orderBy }) {
    try {
      return await this.prismaService.user.findMany({ where, select, skip, take, orderBy });
    } catch (err) {
      throw new DatabaseError(err.code);
    }
  }

  async count({ where }) {
    try {
      return await this.prismaService.user.count({ where });
    } catch (err) {
      throw new DatabaseError(err.code);
    }
  }
}

export default UserRepository;

