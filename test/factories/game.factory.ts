import { PrismaService } from "../../src/prisma/prisma.service";

export class GameFactory { 
    private homeTeamName: string;
	private awayTeamName: string;

  constructor(private readonly prisma: PrismaService) { }
 
  withHomeTeamName(homeTeamName: string) {
    this.homeTeamName = homeTeamName;
    return this;
  }

  withAwayTeamName(awayTeamName: string) {
    this.awayTeamName = awayTeamName;
    return this;
  }

  build() {
    return {
      homeTeamName: this.homeTeamName,
      awayTeamName: this.awayTeamName
    }
  }

  async persist() {
    const game = this.build();
    return await this.prisma.game.create({
      data: game
    })
  }


}