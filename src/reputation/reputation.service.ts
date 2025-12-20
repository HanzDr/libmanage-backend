import { Injectable } from '@nestjs/common';

import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class ReputationService {
  constructor(private prisma: PrismaClient) {}
  async updateCustomerReputationScore(
    customerId: string,
    dateReturned: Date,
    expectedDateReturned: Date,
  ) {
    const delta = this.calculateReputationScoreDelta(
      dateReturned,
      expectedDateReturned,
    );

    const updatedCustomerReputationScore = await this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        borrowerScore: { increment: delta },
      },
    });

    return {
      message: 'Updated Customer Borrower Score Successfully!',
      customer: updatedCustomerReputationScore,
    };
  }

  calculateReputationScoreDelta(
    dateReturned: Date,
    expectedDateReturned: Date,
  ): number {
    const returned = dateReturned.getTime();
    const expected = expectedDateReturned.getTime();

    // Returned early
    if (returned < expected) {
      return 7;
    }

    // Returned on the same day
    if (this.isSameDay(dateReturned, expectedDateReturned)) {
      return 5;
    }

    // Returned late
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysLate = Math.ceil((returned - expected) / msPerDay);

    return daysLate * -2;
  }

  private isSameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
}
