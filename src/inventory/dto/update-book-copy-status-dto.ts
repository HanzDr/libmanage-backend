import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { CopyStatus } from 'src/generated/prisma/enums';

export class UpdateBookCopyStatusDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(CopyStatus, {
    message: `status must be one of: ${Object.values(CopyStatus).join(', ')}`,
  })
  status: CopyStatus;
}
