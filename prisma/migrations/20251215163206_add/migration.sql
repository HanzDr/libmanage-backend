/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "BookCopy" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "LoanedBook" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "dateLoaned" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanedBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "booksloanedCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Book_genre_idx" ON "Book"("genre");

-- CreateIndex
CREATE INDEX "Book_language_idx" ON "Book"("language");

-- CreateIndex
CREATE INDEX "BookCopy_bookId_idx" ON "BookCopy"("bookId");

-- AddForeignKey
ALTER TABLE "LoanedBook" ADD CONSTRAINT "LoanedBook_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
