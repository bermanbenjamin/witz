/*
  Warnings:

  - You are about to drop the column `client_email` on the `Suitability` table. All the data in the column will be lost.
  - You are about to drop the column `client_name` on the `Suitability` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Suitability` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Suitability" DROP CONSTRAINT "Suitability_user_id_fkey";

-- AlterTable
ALTER TABLE "Suitability" DROP COLUMN "client_email",
DROP COLUMN "client_name",
DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Suitability" ADD CONSTRAINT "Suitability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
