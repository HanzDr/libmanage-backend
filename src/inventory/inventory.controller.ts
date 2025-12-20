import { Controller, Patch, Post, Param, Get, Body } from '@nestjs/common';
import { UpdateBookCopyStatusDto } from './dto/update-book-copy-status-dto';
import { AddBookCopyDto } from './dto/add-book-copy-dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  @Post('books/:bookId/copies')
  addBookCopy(
    @Param('bookId') bookId: string,
    @Body() addBookCopyDto: AddBookCopyDto,
  ) {
    return this.inventoryService.addBookCopy(bookId, addBookCopyDto);
  }

  @Get('books/:bookId/copies')
  getBookCopies(@Param('bookId') bookId: string) {}

  @Get('copies/:bookCopyId')
  getCopy(@Param('bookCopyId') bookCopyId: string) {}

  @Patch('copies/:bookCopyId/status')
  updateBookCopyStatus(
    @Param('bookCopyId') bookCopyId: string,
    @Body() updateBookCopyStatusDto: UpdateBookCopyStatusDto,
  ) {}

  @Patch('copies/:bookCopyId/soft-delete')
  deleteBookCopy(@Param('bookCopyId') bookCopyId: string) {}

  @Patch('copies/:bookCopyId/restore')
  restoreBookCopy(@Param('bookCopyId') bookCopyId: string) {}
}
