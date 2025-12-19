import { Controller, Patch, Post, Param, Get, Body } from '@nestjs/common';
import { UpdateBookCopyStatusDto } from './dto/update-book-copy-status-dto';
import { AddBookCopyDto } from './dto/add-book-copy-dto';

@Controller('inventory')
export class InventoryController {
  @Post('books/:bookId/copies')
  addBookCopy(@Param('bookId') bookId: string, @Body() dto: AddBookCopyDto) {}

  @Get('books/:bookId/copies')
  listBookCopies(@Param('bookId') bookId: string) {}

  @Get('copies/:copyId')
  getCopy(@Param('copyId') copyId: string) {}

  @Patch('copies/:copyId/status')
  updateBookCopyStatus(
    @Param('copyId') copyId: string,
    @Body() dto: UpdateBookCopyStatusDto,
  ) {}

  @Patch('copies/:copyId/soft-delete')
  deleteBookCopy(@Param('copyId') copyId: string) {}

  @Patch('copies/:copyId/restore')
  restoreBookCopy(@Param('copyId') copyId: string) {}
}
