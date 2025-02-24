/*
  Warnings:

  - You are about to drop the column `descritpion` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "descritpion",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';
