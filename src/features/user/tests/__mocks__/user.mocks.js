import { jest } from "@jest/globals";
import OrderByEnum from "../../../../common/enums/databaseOrderBy.enum";

export const mockResponse = {
  sendSuccess: jest.fn(),
};

export const nextMock = jest.fn();

export const userDataMock = {
  name: "test",
  email: "test@test.com",
  age: 25,
  mobile: "07 9012 3457",
  country: "egypt",
};

export const idObjectMock = { id: "6d7327e5-accf-4a57-8007-a97247aed8a6" };

export const selectObjectMock = { id: true };

export const findAllMockObject = {
  skip: 0,
  take: 10,
  where: {},
  select: { id: true, age: true, mobile: true, name: true, email: true, country: true },
  orderBy: { createdAt: OrderByEnum.DESC },
};

export const findAllMockData = [{ ...userDataMock, ...idObjectMock }];

