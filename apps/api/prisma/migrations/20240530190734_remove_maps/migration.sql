/*
  Warnings:

  - You are about to drop the `answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `suitabilities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_suitability_id_fkey";

-- DropForeignKey
ALTER TABLE "suitabilities" DROP CONSTRAINT "suitabilities_userId_fkey";

-- DropTable
DROP TABLE "answers";

-- DropTable
DROP TABLE "suitabilities";

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "suitability_id" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,
    "choosed_alternatives_id" INTEGER[],

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suitability" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Suitability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_suitability_id_fkey" FOREIGN KEY ("suitability_id") REFERENCES "Suitability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suitability" ADD CONSTRAINT "Suitability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
