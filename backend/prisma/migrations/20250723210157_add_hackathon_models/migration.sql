-- CreateTable
CREATE TABLE "Hackathon" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "prizes" TEXT[],
    "rules" TEXT NOT NULL,
    "organizers" TEXT[],
    "sponsors" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hackathon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackathonParticipant" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hackathonId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HackathonParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HackathonParticipant_userId_hackathonId_key" ON "HackathonParticipant"("userId", "hackathonId");

-- AddForeignKey
ALTER TABLE "HackathonParticipant" ADD CONSTRAINT "HackathonParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonParticipant" ADD CONSTRAINT "HackathonParticipant_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "Hackathon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
