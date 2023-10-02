import { IsNumber, IsString } from "class-validator";

export class CreateParticipantDto {
    @IsString()
    name: string

    @IsNumber()
    balance: number
}
