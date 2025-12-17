-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "borrowerScore" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ScoreLogs" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScoreLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScoreLogs" ADD CONSTRAINT "ScoreLogs_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreLogs" ADD CONSTRAINT "ScoreLogs_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "BookLoan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
