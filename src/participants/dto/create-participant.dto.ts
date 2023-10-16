import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateParticipantDto {
    @IsString()
    // @IsNotEmpty()
    @ApiProperty({
        example: "John Doe",
        description: "Name of the participant",
    })
    name: string

    @IsNumber()
    // @IsnotEmpty()
    // @IsPositive()
    @ApiProperty({
        example: 1000,
        description: "Balance of the participant in cents of reais",
    })
    balance: number
}
