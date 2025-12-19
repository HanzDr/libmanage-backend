/*
  Warnings:

  - Added the required column `status` to the `BookLoan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookLoan" ADD COLUMN     "status" "CopyStatus" NOT NULL,
ALTER COLUMN "dateReturned" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "ScoreLogs_loanId_idx" ON "ScoreLogs"("loanId");

-- CreateIndex
CREATE INDEX "ScoreLogs_customerId_idx" ON "ScoreLogs"("customerId");
