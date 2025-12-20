import { Controller, Param, Patch, Post, Body } from '@nestjs/common';
import { ReserveBookCopyDto } from './dto/reserve-book-copy-dto';
import { UpdateReservationStatusDto } from './dto/update-reservation-status-dto';

@Controller('reservation')
export class ReservationController {
  @Post('/:bookCopyId/reserve')
  async reserveBookCopy(
    @Param('bookCopyId') bookCopyId: string,
    @Body() reserveBookCopy: ReserveBookCopyDto,
  ) {}

  @Patch('/:bookCopyId/cancel')
  async cancelBookCopyReservation(
    @Param('bookCopyId') bookCopyId: string,
    updateReservationStatusDto: UpdateReservationStatusDto,
  ) {}
}
