import { PrismaService } from "../../src/prisma/prisma.service";

export class ParticipantFactory { // padrão builder
  private name: string;
  private balance: number;

  constructor(private readonly prisma: PrismaService) { }
  

  // setter para name
  withName(name: string) {
    this.name = name;
    return this;
  }

  // setter para balance
  withBalance(balance: number) {
    this.balance = balance;
    return this;
  }

  build() {
    return {
      name: this.name,
      balance: this.balance
    }
  }

  async persist() {
    const media = this.build();
    return await this.prisma.participant.create({
      data: media
    })
  }


}