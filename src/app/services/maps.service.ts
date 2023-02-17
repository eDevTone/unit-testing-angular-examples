import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  public center = { lat: 0, lng: 0 };
  constructor() {}

  public getCurrentPosition(): void {
    navigator.geolocation.getCurrentPosition((response) => {
      const { latitude, longitude } = response.coords;
      this.center = {
        lat: latitude,
        lng: longitude,
      };
    });
  }
}
