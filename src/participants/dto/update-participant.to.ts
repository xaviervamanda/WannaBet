import { IsNumber } from "class-validator";

export class UpdateParticipantDto {
    @IsNumber()
    balance: number;
}