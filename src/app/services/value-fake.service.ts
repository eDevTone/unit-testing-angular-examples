import { of } from 'rxjs';

export class FakeValuService {
  constructor() {}

  getValue(): string {
    return 'fake value';
  }

  setValue(value: string) {}

  getPromiseValue(): Promise<string> {
    return Promise.resolve('fake promise value');
  }
}
