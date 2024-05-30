/*
  Warnings:

  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Suitability` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_suitability_id_fkey";

-- DropForeignKey
ALTER TABLE "Suitability" DROP CONSTRAINT "Suitability_userId_fkey";

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Suitability";

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "suitability_id" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,
    "choosed_alternatives_id" INTEGER[],

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suitabilities" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "suitabilities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_suitability_id_fkey" FOREIGN KEY ("suitability_id") REFERENCES "suitabilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suitabilities" ADD CONSTRAINT "suitabilities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
