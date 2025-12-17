import { Test, TestingModule } from '@nestjs/testing';
import { CirculationService } from './circulation.service';

describe('CirculationService', () => {
  let service: CirculationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CirculationService],
    }).compile();

    service = module.get<CirculationService>(CirculationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
