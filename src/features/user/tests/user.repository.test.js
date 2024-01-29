import { jest } from "@jest/globals";
import UserRepository from "../repositories/user.repository.js";
import {
  findAllMockData,
  findAllMockObject,
  idObjectMock,
  selectObjectMock,
  userDataMock,
} from "./__mocks__/user.mocks.js";
import DatabaseErrorCodeEnum from "../../../common/enums/databaseErrorCode.enum.js";
import StatusCodeEnum from "../../../common/enums/statusCode.enum.js";

describe("User Repository", () => {
  let userRepository;

  beforeAll(() => {
    userRepository = UserRepository.getInstance();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("getInstance", () => {
    test("it should return the same instance", () => {
      const instanceOne = UserRepository.getInstance();
      const instanceTwo = UserRepository.getInstance();

      expect(instanceOne).toBeInstanceOf(UserRepository);
      expect(instanceTwo).toBeInstanceOf(UserRepository);

      expect(instanceOne).toBe(instanceTwo);
    });
  });

  describe("create", () => {
    test("it should return selected columns of created user", async () => {
      userRepository.prismaService.user.create = jest.fn().mockResolvedValueOnce(idObjectMock);

      const data = await userRepository.create({ data: userDataMock, select: selectObjectMock });

      expect(data).toHaveProperty("id");
      expect(data.id).toBe(idObjectMock.id);
    });

    test("it should throw 400 bad request error depend on P2002 error code for duplicate entry in database create", async () => {
      try {
        userRepository.prismaService.user.create = jest.fn().mockRejectedValueOnce({
          code: DatabaseErrorCodeEnum.DUPLICATE_ENTRY,
        });

        await userRepository.create({ data: userDataMock, select: selectObjectMock });
      } catch (err) {
        expect(err.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
        expect(err.errors).toBe("try to enter duplicate entry");
      }
    });

    test("it should throw 500 server error depend on unknown error code in database create", async () => {
      try {
        userRepository.prismaService.user.create = jest.fn().mockRejectedValueOnce({
          code: "P3000",
        });

        await userRepository.create({ data: userDataMock, select: selectObjectMock });
      } catch (err) {
        expect(err.statusCode).toBe(StatusCodeEnum.INTERNAL_SERVER_ERROR);
        expect(err.errors).toBe("something went wrong");
      }
    });
  });

  describe("update", () => {
    test("it should return selected columns of updated user", async () => {
      userRepository.prismaService.user.update = jest.fn().mockResolvedValueOnce(idObjectMock);

      const data = await userRepository.update({ where: idObjectMock, data: userDataMock, select: selectObjectMock });

      expect(data).toHaveProperty("id");
      expect(data.id).toBe(idObjectMock.id);
    });

    test("it should throw 400 bad request error depend on P2002 error code for duplicate entry in database update", async () => {
      try {
        userRepository.prismaService.user.update = jest.fn().mockRejectedValueOnce({
          code: DatabaseErrorCodeEnum.DUPLICATE_ENTRY,
        });

        await userRepository.update({ where: idObjectMock, data: userDataMock, select: selectObjectMock });
      } catch (err) {
        expect(err.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
        expect(err.errors).toBe("try to enter duplicate entry");
      }
    });

    test("it should throw 500 server error depend on unknown error code in database update", async () => {
      try {
        userRepository.prismaService.user.update = jest.fn().mockRejectedValueOnce({
          code: "P3000",
        });

        await userRepository.update({ where: idObjectMock, data: userDataMock, select: selectObjectMock });
      } catch (err) {
        expect(err.statusCode).toBe(StatusCodeEnum.INTERNAL_SERVER_ERROR);
        expect(err.errors).toBe("something went wrong");
      }
    });
  });

  describe("delete", () => {
    test("it should return selected columns of deleted user", async () => {
      userRepository.prismaService.user.delete = jest.fn().mockResolvedValueOnce(idObjectMock);

      const data = await userRepository.delete({ where: idObjectMock, select: selectObjectMock });

      expect(data).toHaveProperty("id");
      expect(data.id).toBe(idObjectMock.id);
    });

    test("it should throw 500 server error depend on unknown error code in database delete", async () => {
      try {
        userRepository.prismaService.user.delete = jest.fn().mockRejectedValueOnce({
          code: "P3000",
        });

        await userRepository.delete({ where: idObjectMock, select: selectObjectMock });
      } catch (err) {
        expect(err.statusCode).toBe(StatusCodeEnum.INTERNAL_SERVER_ERROR);
        expect(err.errors).toBe("something went wrong");
      }
    });
  });

  describe("count", () => {
    test("it should return number of rows of returned user", async () => {
      userRepository.prismaService.user.count = jest.fn().mockResolvedValueOnce(10);

      const data = await userRepository.count({});

      expect(data).toBe(10);
    });

    test("it should throw 500 server error depend on unknown error code in database count", async () => {
      try {
        userRepository.prismaService.user.count = jest.fn().mockRejectedValueOnce({
          code: "P3000",
        });

        await userRepository.count({});
      } catch (err) {
        expect(err.statusCode).toBe(StatusCodeEnum.INTERNAL_SERVER_ERROR);
        expect(err.errors).toBe("something went wrong");
      }
    });
  });

  describe("count", () => {
    test("it should return number of rows of returned user", async () => {
      userRepository.prismaService.user.findMany = jest.fn().mockResolvedValueOnce(findAllMockData);

      const data = await userRepository.findAll(findAllMockObject);

      expect(data).toHaveLength(1);
      expect(data).toBe(findAllMockData);
    });

    test("it should throw 500 server error depend on unknown error code in database findMany", async () => {
      try {
        userRepository.prismaService.user.findAll = jest.fn().mockRejectedValueOnce({
          code: "P3000",
        });

        await userRepository.findAll(findAllMockObject);
      } catch (err) {
        expect(err.statusCode).toBe(StatusCodeEnum.INTERNAL_SERVER_ERROR);
        expect(err.errors).toBe("something went wrong");
      }
    });
  });
});

