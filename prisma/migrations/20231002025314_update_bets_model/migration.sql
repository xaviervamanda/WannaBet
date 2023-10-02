-- CreateEnum
CREATE TYPE "BetStatus" AS ENUM ('WON', 'LOST', 'PENDING');

-- AlterTable
ALTER TABLE "bets" ADD COLUMN     "status" "BetStatus" NOT NULL DEFAULT 'PENDING';
