import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService],
    });
    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getCurrentPosition', () => {
    it('should save the center position', () => {
      //Arrange
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
        (successFn) => {
          const mockGeolocation: GeolocationPosition = {
            coords: {
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              latitude: 1000,
              longitude: 2000,
              speed: 0,
            },
            timestamp: 3281973,
          };
          successFn(mockGeolocation);
        }
      );
      //Act
      service.getCurrentPosition();
      //Assert
      expect(service.center.lat).toEqual(1000);
      expect(service.center.lng).toEqual(2000);
    });
  });
});
