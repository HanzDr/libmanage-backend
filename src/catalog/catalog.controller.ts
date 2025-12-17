import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { BookFilterDto } from './dto/book-filter-dto';
import { BookPaginationDto } from './dto/book-pagination-dto';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}
  @Post('create-book')
  async createBook(@Body() createBookDto: CreateBookDto) {
    return this.catalogService.createBook(createBookDto);
  }

  @Get()
  async fetchBookByFilter(@Query() bookFilterDto: BookFilterDto) {
    return this.catalogService.fetchBookByFilter(bookFilterDto);
  }

  @Get()
  async fetchBookByPagination(@Query() bookPaginationDto: BookPaginationDto) {
    return this.catalogService.fetchBookByPagination(bookPaginationDto);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.catalogService.updateBook(updateBookDto);
  }
}
