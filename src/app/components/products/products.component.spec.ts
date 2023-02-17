import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, defer } from 'rxjs';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ValueService } from '../../services/value.service';
import { ProductsService } from '../../services/products.service';
import { ProductComponent } from '../product/product.component';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', [
      'getPromiseValue',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        {
          provide: ValueService,
          useValue: valueServiceSpy,
        },
        {
          provide: ProductsService,
          useValue: productServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;

    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('Test for getAllProducts', () => {
    it('should return product list from service', () => {
      //Arrange
      const productsMock = generateManyProducts(10);
      const expectImg = productsMock[0].images[0];
      productService.getAll.and.returnValue(of(productsMock));
      const countPrev = component.products.length;
      
      const button = fixture.debugElement.query(By.css('#get-products'))
      //Act
      button.triggerEventHandler('click', null);
      fixture.detectChanges();
      const productDebug = fixture.debugElement.queryAll(By.css('app-product'));
      const expectedImg = fixture.debugElement.query(By.css('app-product img'));

      //Assert
      expect(component.products.length).toEqual(
        productsMock.length + countPrev
      );
      expect(productDebug.length).toEqual(productsMock.length + countPrev);
      expect(expectedImg.nativeElement.src).toEqual(expectImg);
    });

    it('should change the status "loading" => "success"', fakeAsync(() => {
      //Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(
        defer(() => Promise.resolve(productsMock))
      );
      const button = fixture.debugElement.query(By.css('#get-products'))
      //Act
      button.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(); // obs,promise, setTimeout()
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('success');
    }));

    it('should change the status "loading" => "error"', fakeAsync(() => {
      //Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(
        defer(() => Promise.reject(productsMock))
      );
      const button = fixture.debugElement.query(By.css('#get-products'))
      //Act
      button.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(4000); // obs,promise, setTimeout()
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('error');
    }));
  });

  describe('test for callPromise', () => {
    it('should call to promise', fakeAsync(() => {
      //Arrange
      const mockMessage = 'my mock string';
      valueService.getPromiseValue.and.returnValue(
        Promise.resolve(mockMessage)
      );
      const buttonDebug = fixture.debugElement.query(By.css('.btn-promise'));
      //Act
      buttonDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      //Assert
      expect(component.rta).toEqual(mockMessage);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    }));

    it('should call to promise when user click button', fakeAsync(() => {
      //Arrange
      const buttonDebug = fixture.debugElement.query(By.css('.btn-promise'));
      const mockMessage = 'my mock string';
      valueService.getPromiseValue.and.returnValue(
        Promise.resolve(mockMessage)
      );
      //Act
      buttonDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const pRta = fixture.debugElement.query(By.css('.rta'));
      //Assert
      expect(pRta.nativeElement.textContent).toEqual(mockMessage);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    }));
  });
});
