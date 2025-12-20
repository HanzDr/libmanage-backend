/*
  Warnings:

  - You are about to drop the column `booksloanedCount` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `booksLoanedCount` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "booksloanedCount",
ADD COLUMN     "booksLoanedCount" INTEGER NOT NULL;
