-- DropForeignKey
ALTER TABLE "PlayscriptCharacterLine" DROP CONSTRAINT "PlayscriptCharacterLine_playscriptCharacterEventId_fkey";

-- AddForeignKey
ALTER TABLE "PlayscriptCharacterLine" ADD CONSTRAINT "PlayscriptCharacterLine_playscriptCharacterEventId_fkey" FOREIGN KEY ("playscriptCharacterEventId") REFERENCES "PlayscriptCharacterEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
