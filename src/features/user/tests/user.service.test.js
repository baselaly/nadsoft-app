import { jest } from "@jest/globals";
import UserService from "../services/user.service.js";
import ErrorClass from "../../../common/classes/error.class.js";
import StatusCodeEnum from "../../../common/enums/statusCode.enum.js";
import { idObjectMock, userDataMock } from "./__mocks__/user.mocks.js";

describe("User Service", () => {
  let userService;

  beforeAll(() => {
    userService = UserService.getInstance();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getInstance", () => {
    test("it should return the same instance", () => {
      const instanceOne = UserService.getInstance();
      const instanceTwo = UserService.getInstance();

      expect(instanceOne).toBeInstanceOf(UserService);
      expect(instanceTwo).toBeInstanceOf(UserService);

      expect(instanceOne).toBe(instanceTwo);
    });
  });

  describe("create", () => {
    test("it should return id of created user", async () => {
      userService.userRepository.create = jest.fn().mockResolvedValueOnce(idObjectMock);

      const data = await userService.create(userDataMock);

      expect(data).toStrictEqual(idObjectMock);
    });
  });

  describe("update", () => {
    test("it should return id of updated user", async () => {
      userService.userRepository.update = jest.fn().mockResolvedValueOnce(idObjectMock);

      userService.userRepository.findOne = jest.fn().mockResolvedValueOnce(idObjectMock);

      const data = await userService.update("6d7327e5-accf-4a57-8007-a97247aed8a6", userDataMock);

      expect(data).toStrictEqual(idObjectMock);
    });

    test("it should throw 404 user not found", async () => {
      try {
        userService.userRepository.findOne = jest.fn().mockResolvedValueOnce(null);

        await userService.update("6d7327e5-accf-4a57-8007-a97247aed8a6", userDataMock);
      } catch (err) {
        expect(err).toStrictEqual(new ErrorClass(StatusCodeEnum.NOT_FOUND, "user not found"));
      }
    });
  });

  describe("delete", () => {
    test("it should return id of deleted user", async () => {
      userService.userRepository.delete = jest.fn().mockResolvedValueOnce(idObjectMock);

      userService.userRepository.findOne = jest.fn().mockResolvedValueOnce(idObjectMock);

      const data = await userService.delete("6d7327e5-accf-4a57-8007-a97247aed8a6");

      expect(data).toStrictEqual(idObjectMock);
    });

    test("it should throw 404 user not found", async () => {
      try {
        userService.userRepository.findOne = jest.fn().mockResolvedValueOnce(null);

        await userService.delete("6d7327e5-accf-4a57-8007-a97247aed8a6");
      } catch (err) {
        expect(err).toStrictEqual(new ErrorClass(StatusCodeEnum.NOT_FOUND, "user not found"));
      }
    });
  });

  describe("findAll", () => {
    test("it should retutn users list and total pages", async () => {
      userService.userRepository.findAll = jest.fn().mockResolvedValueOnce([userDataMock]);
      userService.userRepository.count = jest.fn().mockResolvedValueOnce(10);

      const data = await userService.findAll({ page: 1, perPage: 10 });

      expect(data).toHaveProperty("totalPages");
      expect(data).toHaveProperty("users");

      expect(data.users).toEqual([userDataMock]);
    });
  });
});

