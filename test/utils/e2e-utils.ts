import { PrismaService } from "../../src/prisma/prisma.service";

export class E2EUtils {
  static async cleanDb(prisma: PrismaService) {
    await prisma.bet.deleteMany();
    await prisma.game.deleteMany();
    await prisma.participant.deleteMany();
  }

}