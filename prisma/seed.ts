import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const firstParticipant = await prisma.participant.findFirst();

    if (firstParticipant) return; 

    const participant = await prisma.participant.create({
        data: {
            name: "John Doe",
            balance: 2000,
        },
    });

    const game = await prisma.game.create({
        data: {
            homeTeamName: "Avai",
            awayTeamName: "Botafogo",   
        }
    });

    const bet = await prisma.bet.create({
        data: {
            participantId: participant.id,
            gameId: game.id,
            homeTeamScore: 2,
            awayTeamScore: 1,
            amountBet: 100
        },
    });

    console.log({ participant, game, bet });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })