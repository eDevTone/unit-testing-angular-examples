import { waitForAsync } from '@angular/core/testing';
import { ValueService } from './value.service';

import { TestBed } from '@angular/core/testing';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService],
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return "my value"', () => {
      //AAA
      expect(service.getValue()).toBe('my value');
    });

    it('should change the value', () => {
      //AAA
      expect(service.getValue()).toBe('my value');
      service.setValue('Eqs');
      expect(service.getValue()).toBe('Eqs');
    });

    it('should return "promise value" from promise with then', (done) => {
      service.getPromiseValue().then((value) => {
        //assert
        expect(value).toBe('promise value');
        done();
      });
    });

    it('should return "promise value" from promise async/await', async () => {
      const result = await service.getPromiseValue();
      expect(result).toBe('promise value');
    });

    it('should return "promise value" from promise with waitForAsync', waitForAsync(() => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
      });
    }));

    it('should return "promise value" from promise with then', (done) => {
      service.getPromiseValue().then((value) => {
        //assert
        expect(value).toBe('promise value');
        done();
      });
    });

    it('should return "observable value" from observavble', (done) => {
      service.getObservableValue().subscribe((value) => {
        //assert
        expect(value).toBe('observable value');
        done();
      });
    });
  });
});
