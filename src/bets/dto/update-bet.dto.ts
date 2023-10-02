import { IsIn, IsNumber, IsString } from "class-validator";

export enum BetStatus {
    WON = "WON",
    LOST = "LOST",
    PENDING = "PENDING"
}

export class UpdateBetDto {
    @IsIn(["WON", "LOST", "PENDING"])
    status: BetStatus

    @IsNumber()
    amountWon: number
}

