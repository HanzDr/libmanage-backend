import { Injectable } from '@nestjs/common';
import { AddBookCopyDto } from './dto/add-book-copy-dto';
import { PrismaClient } from 'src/generated/prisma/client';
import { UpdateBookCopyStatusDto } from './dto/update-book-copy-status-dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaClient) {}

  // Creates a Book copy in BookCopy Model
  async addBookCopy(bookId: string, addBookCopyDto: AddBookCopyDto) {
    const { status } = addBookCopyDto;
    const newBookCopy = await this.prisma.bookCopy.create({
      data: {
        bookId,
        deletedAt: null,
        status: 'AVAILABLE',
      },
    });

    return {
      message: 'Book Copy created Successfully',
      book: newBookCopy,
    };
  }

  // Fetches all copies of a parituclar bookId
  async getBookCopies(bookId: string) {
    const bookList = await this.prisma.bookCopy.findMany({
      where: {
        bookId,
      },
    });

    return {
      message: 'Fetched book list Successfully',
      bookList,
    };
  }

  // Fetches one particular book copy
  async getCopy(bookId: string) {
    const bookCopy = await this.prisma.bookCopy.findFirst({
      where: {
        bookId,
      },
    });

    return {
      message: 'Fetched book Successfully',
      bookCopy,
    };
  }

  async updateBookCopyStatus(bookCopyId: string, dto: UpdateBookCopyStatusDto) {
    const updatedBookCopy = await this.prisma.bookCopy.update({
      where: { id: bookCopyId },
      data: {
        status: dto.status,
      },
    });

    return {
      message: 'Book copy status updated',
      copy: updatedBookCopy,
    };
  }

  async deleteBookCopy(bookCopyId: string) {
    const deletedBookCopy = await this.prisma.bookCopy.update({
      where: { id: bookCopyId },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      message: 'Book copy deleted successfully',
      id: bookCopyId,
    };
  }

  async restoreBookCopy(bookCopyId: string) {
    const restoredBookCopy = await this.prisma.bookCopy.update({
      where: { id: bookCopyId },
      data: {
        deletedAt: null,
      },
    });

    return {
      message: 'Book copy restored successfully',
      id: bookCopyId,
    };
  }
}
