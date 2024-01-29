import { jest } from "@jest/globals";
import UserController from "../controllers/user.controller.js";
import StatusCodeEnum from "../../../common/enums/statusCode.enum.js";
import ErrorClass from "../../../common/classes/error.class.js";
import { mockResponse, nextMock, userDataMock, idObjectMock } from "./__mocks__/user.mocks.js";

describe("User Controller", () => {
  let userController;

  beforeAll(() => {
    userController = UserController.getInstance();
  });

  beforeEach(() => {
    mockResponse.sendSuccess.mockReset();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("getInstance", () => {
    test("it should return the same instance", () => {
      const instanceOne = UserController.getInstance();
      const instanceTwo = UserController.getInstance();

      expect(instanceOne).toBeInstanceOf(UserController);
      expect(instanceTwo).toBeInstanceOf(UserController);

      expect(instanceOne).toBe(instanceTwo);
    });
  });

  describe("create", () => {
    const mockRequest = { body: userDataMock };

    test("it should return success response", async () => {
      userController.userService.create = jest.fn().mockResolvedValueOnce(idObjectMock);

      await userController.create(mockRequest, mockResponse, nextMock);

      expect(mockResponse.sendSuccess).toHaveBeenCalledWith({
        data: idObjectMock,
        statusCode: StatusCodeEnum.CREATED,
        message: "user created successfully",
      });
    });

    test("it should throw 400 duplicate email entry", async () => {
      userController.userService.create = jest
        .fn()
        .mockRejectedValueOnce(new ErrorClass(StatusCodeEnum.BAD_REQUEST, "try to enter duplicate entry"));

      await userController.create(mockRequest, mockResponse, nextMock);

      expect(nextMock).toHaveBeenCalledWith(new ErrorClass(StatusCodeEnum.BAD_REQUEST, "try to enter duplicate entry"));
    });
  });

  describe("update", () => {
    const mockRequest = { body: userDataMock, params: idObjectMock };

    test("it should return success response", async () => {
      userController.userService.update = jest.fn().mockResolvedValueOnce(idObjectMock);

      await userController.update(mockRequest, mockResponse, nextMock);

      expect(mockResponse.sendSuccess).toHaveBeenCalledWith({
        data: idObjectMock,
        message: "user updated successfully",
      });
    });

    test("it should throw 400 duplicate email entry", async () => {
      userController.userService.update = jest
        .fn()
        .mockRejectedValueOnce(new ErrorClass(StatusCodeEnum.BAD_REQUEST, "try to enter duplicate entry"));

      await userController.update(mockRequest, mockResponse, nextMock);

      expect(nextMock).toHaveBeenCalledWith(new ErrorClass(StatusCodeEnum.BAD_REQUEST, "try to enter duplicate entry"));
    });

    test("it should throw 404 user not found", async () => {
      userController.userService.update = jest
        .fn()
        .mockRejectedValueOnce(new ErrorClass(StatusCodeEnum.NOT_FOUND, "user not found"));

      await userController.update(mockRequest, mockResponse, nextMock);

      expect(nextMock).toHaveBeenCalledWith(new ErrorClass(StatusCodeEnum.NOT_FOUND, "user not found"));
    });
  });

  describe("delete", () => {
    const mockRequest = { params: idObjectMock };

    test("it should return success response", async () => {
      userController.userService.delete = jest.fn().mockResolvedValueOnce(idObjectMock);

      await userController.delete(mockRequest, mockResponse, nextMock);

      expect(mockResponse.sendSuccess).toHaveBeenCalledWith({
        data: idObjectMock,
        message: "user deleted successfully",
      });
    });

    test("it should throw 404 user not found", async () => {
      userController.userService.delete = jest
        .fn()
        .mockRejectedValueOnce(new ErrorClass(StatusCodeEnum.NOT_FOUND, "user not found"));

      await userController.delete(mockRequest, mockResponse, nextMock);

      expect(nextMock).toHaveBeenCalledWith(new ErrorClass(StatusCodeEnum.NOT_FOUND, "user not found"));
    });
  });

  describe("findAll", () => {
    const mockRequest = { query: { page: 1, perPage: 10 } };
    const mockUsers = [{ ...idObjectMock, ...userDataMock }];
    const mockTotalPages = 1;

    test("it should return success response with serialized users list and total pages", async () => {
      userController.userService.findAll = jest
        .fn()
        .mockResolvedValueOnce({ totalPages: mockTotalPages, users: mockUsers });

      await userController.findAll(mockRequest, mockResponse, nextMock);

      expect(mockResponse.sendSuccess).toHaveBeenCalledWith({
        data: { totalPages: mockTotalPages, users: mockUsers },
        message: "success",
      });
    });
  });
});

