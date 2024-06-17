/*
  Warnings:

  - Added the required column `profileType` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('SUPER_CONSERVER', 'CONSERVER', 'MODERATE', 'AGRESSIVE', 'SUPER_AGRESSIVE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profileType" "ProfileType" NOT NULL;
