import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

import { CatalogModule } from './catalog/catalog.module';
import { InventoryModule } from './inventory/inventory.module';
import { CirculationModule } from './circulation/circulation.module';
import { ReservationModule } from './reservation/reservation.module';
import { ReputationModule } from './reputation/reputation.module';

@Module({
  imports: [
    PrismaModule,
    CatalogModule,
    InventoryModule,
    CirculationModule,
    ReservationModule,
    ReputationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
