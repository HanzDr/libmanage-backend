import { IsEnum } from 'class-validator';
import { CopyStatus } from 'src/generated/prisma/enums';

export class UpdateReservationStatusDto {
  @IsEnum(CopyStatus, {
    message: `status must be one of: ${Object.values(CopyStatus).join(', ')}`,
  })
  status: CopyStatus;
}
