import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient } from 'src/generated/prisma/client';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { FetchBookDto } from './dto/fetch-book-dto';

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

  async updateBook(updateBookDto: UpdateBookDto) {
    const { id, bookTitle, publishedAt, genre, edition, language, isbn } =
      updateBookDto;

    const isBookAvailable = await this.prisma.book.findFirst({
      where: {
        id,
      },
    });

    if (!isBookAvailable) throw new BadRequestException('Book does not exist');

    const updatedBook = await this.prisma.book.update({
      where: { id },
      data: {
        bookTitle: bookTitle ?? undefined,
        genre: genre ?? undefined,
        edition: edition ?? undefined,
        language: language ?? undefined,
        isbn: isbn ?? undefined,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      },
    });

    return {
      message: 'Successfully Update the Book',
      book: updatedBook,
    };
  }

  async getBooks(fetchBookDto: FetchBookDto) {
    const {
      page: rawPage,
      limit: rawLimit,
      bookTitle,
      genre,
      language,
    } = fetchBookDto;

    const page = rawPage ?? 1;
    const limit = rawLimit ?? 10;
    const skip = (page - 1) * limit;

    const [books, bookAmount] = await this.prisma.$transaction([
      this.prisma.book.findMany({
        where: { bookTitle, genre, language, deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
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
        page,
        limit,
        totalPages: Math.ceil(bookAmount / limit),
        filters: {
          bookTitle: bookTitle ?? null,
          genre: genre ?? null,
          language: language ?? null,
        },
      },
    };
  }
}
