import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateParticipantDto {
    @IsString()
    @ApiProperty({
        example: "John Doe",
        description: "Name of the participant",
    })
    name: string

    @IsNumber()
    @ApiProperty({
        example: 1000,
        description: "Balance of the participant in cents of reais",
    })
    balance: number
}
