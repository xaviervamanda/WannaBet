import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateParticipantDto {
    @IsNumber()
    @IsNotEmpty()
    balance: number;
}