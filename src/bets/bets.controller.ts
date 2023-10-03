import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('bets')
@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a bet' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'User balance is not enough fot the bet amount' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Games user wants to bet is already finished' })
  create(@Body() createBetDto: CreateBetDto) {
    return this.betsService.create(createBetDto);
  }

}
