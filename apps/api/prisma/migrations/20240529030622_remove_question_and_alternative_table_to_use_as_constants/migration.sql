/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionAlternative` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_choosed_alternative_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionAlternative" DROP CONSTRAINT "QuestionAlternative_questionId_fkey";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "QuestionAlternative";
