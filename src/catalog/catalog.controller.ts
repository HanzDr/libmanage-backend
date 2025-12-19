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
import { FetchBookDto } from './dto/fetch-book-dto';
import { CatalogService } from './catalog.service';

@Controller('catalog/books')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  createBook(@Body() dto: CreateBookDto) {
    return this.catalogService.createBook(dto);
  }

  @Get()
  getBooks(@Query() dto: FetchBookDto) {
    return this.catalogService.getBooks(dto);
  }

  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.catalogService.updateBook(dto);
  }
}
