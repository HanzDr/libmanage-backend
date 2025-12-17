/*
  Warnings:

  - You are about to drop the `LoanedBook` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deletedAt` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LoanedBook" DROP CONSTRAINT "LoanedBook_customerId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "LoanedBook";

-- CreateTable
CREATE TABLE "BookLoan" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "bookCopyId" TEXT NOT NULL,
    "dateBorrowed" TIMESTAMP(3) NOT NULL,
    "dateReturned" TIMESTAMP(3) NOT NULL,
    "expectedDateReturned" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookReserve" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "bookCopyId" TEXT NOT NULL,
    "expectedDateBorrowed" TIMESTAMP(3) NOT NULL,
    "expectedDateReturned" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookReserve_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookLoan" ADD CONSTRAINT "BookLoan_bookCopyId_fkey" FOREIGN KEY ("bookCopyId") REFERENCES "BookCopy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookLoan" ADD CONSTRAINT "BookLoan_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookReserve" ADD CONSTRAINT "BookReserve_bookCopyId_fkey" FOREIGN KEY ("bookCopyId") REFERENCES "BookCopy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookReserve" ADD CONSTRAINT "BookReserve_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
