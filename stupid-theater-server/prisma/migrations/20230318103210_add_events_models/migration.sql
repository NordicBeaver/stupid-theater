-- CreateTable
CREATE TABLE "PlayscriptNarratorEvent" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "line" TEXT NOT NULL,
    "playscriptId" TEXT NOT NULL,

    CONSTRAINT "PlayscriptNarratorEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayscriptCharacterEvent" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "playscriptId" TEXT NOT NULL,

    CONSTRAINT "PlayscriptCharacterEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayscriptCharacterLine" (
    "id" TEXT NOT NULL,
    "playscriptCharacterEventId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "line" TEXT NOT NULL,

    CONSTRAINT "PlayscriptCharacterLine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayscriptNarratorEvent" ADD CONSTRAINT "PlayscriptNarratorEvent_playscriptId_fkey" FOREIGN KEY ("playscriptId") REFERENCES "Playscript"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayscriptCharacterEvent" ADD CONSTRAINT "PlayscriptCharacterEvent_playscriptId_fkey" FOREIGN KEY ("playscriptId") REFERENCES "Playscript"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayscriptCharacterLine" ADD CONSTRAINT "PlayscriptCharacterLine_playscriptCharacterEventId_fkey" FOREIGN KEY ("playscriptCharacterEventId") REFERENCES "PlayscriptCharacterEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayscriptCharacterLine" ADD CONSTRAINT "PlayscriptCharacterLine_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
