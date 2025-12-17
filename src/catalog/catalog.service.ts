import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from 'src/generated/prisma/client';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { BookFilterDto } from './dto/book-filter-dto';
import { BookPaginationDto } from './dto/book-pagination-dto';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaClient) {}

  async createBook(createBookDto: CreateBookDto) {
    const { bookTitle, publishedAt, genre, edition, language, isbn } =
      createBookDto;

    try {
      const newBook = await this.prisma.book.create({
        data: {
          bookTitle,
          publishedAt,
          genre,
          edition,
          language,
          isbn,
        },
        select: {
          id: true,
          bookTitle: true,
          genre: true,
          edition: true,
          language: true,
          isbn: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create book');
    }
  }

  async updateBook(updateBookDto: UpdateBookDto) {}

  async fetchBookByFilter(bookFilterDto: BookFilterDto) {
    const { language, bookTitle, genre } = bookFilterDto;
    try {
      const books = await this.prisma.book.findMany({
        where: {
          deletedAt: null,
          bookTitle: bookTitle
            ? { contains: bookTitle, mode: 'insensitive' }
            : undefined,
          genre,
          language,
        },
      });
      return books;
    } catch (error) {
      throw new InternalServerErrorException('Failed to Fetch book');
    }
  }

  async fetchBookByPagination(bookPaginationDto: BookPaginationDto) {
    const page = bookPaginationDto.page ?? 1;
    const limit = bookPaginationDto.limit ?? 10;

    const skip = (page - 1) * limit;

    const [books, total] = await this.prisma.$transaction([
      this.prisma.book.findMany({
        where: {
          deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.book.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    return {
      data: books,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
