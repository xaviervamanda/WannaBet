import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('participants')
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @ApiOperation({ summary: "Creates a new participant" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "The record has been successfully created" })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "The balance is less than 1000 cents of reais" })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all participants" })
  findAll() {
    return this.participantsService.findAll();
  }

}
