import { PrismaClient } from "@prisma/client";

export default class PrismaService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new PrismaClient();
    }

    return this.instance;
  }
}

