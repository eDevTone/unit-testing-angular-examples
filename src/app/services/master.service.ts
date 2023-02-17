import { Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private readonly _valueService: ValueService) {}


  getValue(): string {
    return this._valueService.getValue();
    // return 'fake value';
  }
}
