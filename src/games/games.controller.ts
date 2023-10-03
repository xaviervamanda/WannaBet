import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new game' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Post(':id/finish')
  @ApiParam({ name: 'id', description: 'game id', example: 1, type: 'number' })
  @ApiOperation({ summary: 'Finish a existing game' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully finished' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The game is already finished' })
  finishGame(@Body() updateGameDto: UpdateGameDto, @Param('id') id: string) {
    return this.gamesService.finishGame(+id, updateGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Gets all games' })
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'game id', example: 1, type: 'number' })
  @ApiOperation({ summary: 'Gets a specific game' })
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

}
