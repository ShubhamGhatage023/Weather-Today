import { TestBed } from '@angular/core/testing';

import { WeatherTodayService } from './weather-today.service';

describe('WeatherTodayService', () => {
  let service: WeatherTodayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherTodayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
