-- CreateEnum
CREATE TYPE "CopyStatus" AS ENUM ('AVAILABLE', 'LOANED', 'LOST', 'DAMAGED', 'IN_REPAIR');

-- CreateTable
CREATE TABLE "BookCopy" (
    "id" TEXT NOT NULL,
    "bookId" TEXT,
    "status" "CopyStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "BookCopy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookCopy" ADD CONSTRAINT "BookCopy_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
