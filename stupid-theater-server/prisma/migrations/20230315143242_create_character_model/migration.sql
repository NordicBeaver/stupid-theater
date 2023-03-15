-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "playscriptId" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_playscriptId_fkey" FOREIGN KEY ("playscriptId") REFERENCES "Playscript"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
