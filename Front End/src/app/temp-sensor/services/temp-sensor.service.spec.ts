import { TestBed } from '@angular/core/testing';

import { TempSensorService } from './temp-sensor.service';

describe('TempSensorService', () => {
  let service: TempSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
