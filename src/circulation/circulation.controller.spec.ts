import { Test, TestingModule } from '@nestjs/testing';
import { CirculationController } from './circulation.controller';

describe('CirculationController', () => {
  let controller: CirculationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CirculationController],
    }).compile();

    controller = module.get<CirculationController>(CirculationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
