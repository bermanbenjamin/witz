/*
  Warnings:

  - You are about to drop the column `choosed_alternative_id` on the `Answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "choosed_alternative_id",
ADD COLUMN     "choosed_alternatives_id" INTEGER[];
