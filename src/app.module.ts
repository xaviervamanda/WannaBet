import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParticipantsModule } from './participants/participants.module';
import { GamesModule } from './games/games.module';
import { BetsModule } from './bets/bets.module';

@Module({
  imports: [ParticipantsModule, GamesModule, BetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
