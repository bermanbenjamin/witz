/*
  Warnings:

  - The primary key for the `Answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Answer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `QuestionAlternative` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `QuestionAlternative` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `question_id` on the `Answer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `choosed_alternative_id` on the `Answer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `question_id` on the `QuestionAlternative` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `score` to the `Suitability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Suitability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_choosed_alternative_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionAlternative" DROP CONSTRAINT "QuestionAlternative_question_id_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "question_id",
ADD COLUMN     "question_id" INTEGER NOT NULL,
DROP COLUMN "choosed_alternative_id",
ADD COLUMN     "choosed_alternative_id" INTEGER NOT NULL,
ADD CONSTRAINT "Answer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
ADD COLUMN     "alternatives" TEXT[],
ADD COLUMN     "weights" INTEGER[],
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "QuestionAlternative" DROP CONSTRAINT "QuestionAlternative_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "question_id",
ADD COLUMN     "question_id" INTEGER NOT NULL,
ADD CONSTRAINT "QuestionAlternative_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Suitability" ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionAlternative" ADD CONSTRAINT "QuestionAlternative_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_choosed_alternative_id_fkey" FOREIGN KEY ("choosed_alternative_id") REFERENCES "QuestionAlternative"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suitability" ADD CONSTRAINT "Suitability_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
