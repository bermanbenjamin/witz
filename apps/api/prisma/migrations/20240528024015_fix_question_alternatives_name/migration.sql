/*
  Warnings:

  - You are about to drop the column `question_id` on the `QuestionAlternative` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionAlternative" DROP CONSTRAINT "QuestionAlternative_question_id_fkey";

-- AlterTable
ALTER TABLE "QuestionAlternative" DROP COLUMN "question_id",
ADD COLUMN     "questionId" INTEGER;

-- AddForeignKey
ALTER TABLE "QuestionAlternative" ADD CONSTRAINT "QuestionAlternative_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
