import { TestBed } from '@angular/core/testing';

import { DeviceControlsService } from './device-controls.service';

describe('DeviceControlsService', () => {
  let service: DeviceControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
