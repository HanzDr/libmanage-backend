import { Module } from '@nestjs/common';
import { CirculationService } from './circulation.service';
import { CirculationController } from './circulation.controller';
import { ReputationService } from 'src/reputation/reputation.service';

@Module({
  providers: [CirculationService, ReputationService],
  controllers: [CirculationController],
})
export class CirculationModule {}
