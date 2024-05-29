/*
  Warnings:

  - You are about to drop the column `alternatives` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `weights` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "alternatives",
DROP COLUMN "weights";
