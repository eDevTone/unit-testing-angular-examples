import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { environment } from '../../environments/environment';

import { ProductsService } from './products.service';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import { generateOneCategory } from '../models/category.mock';
import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { TokenService } from './token.services';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });

    productsService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(productsService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return a product list', (done) => {
      //Arrange
      spyOn(tokenService, 'getToken').and.returnValue('123');
      const mockData: Product[] = generateManyProducts(2);
      //Act
      productsService.getAllSimple().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        done();
      });

      //http config 
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123')
      req.flush(mockData);
    });
  });

  describe('test for getAll', () => {
    it('should return a product list', (done) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productsService.getAll().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        done();
      });

      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should return product list with taxes', (done) => {
      //Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 200 - * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 - * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 0 - * .19 = 0
        },
        {
          ...generateOneProduct(),
          price: -100, // -100 - * .19 = 0
        },
      ];

      productsService.getAll().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        done();
      });

      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should send query params with limit 10 and offset 3', (done) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 0;
      //Act
      productsService.getAll(limit, offset).subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);

      const params = req.request.params;
      expect(params.get('limit')).toEqual(String(limit));
      expect(params.get('offset')).toEqual(String(offset));
    });
  });

  describe('test for create request', () => {
    it('should return a new product', (done) => {
      //Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        ...mockData,
        categoryId: generateOneCategory().id,
      };

      productsService.create({ ...dto }).subscribe((response) => {
        expect(response).toEqual(mockData);
        done();
      });
      //Act

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
      //Assert
    });
  });

  describe('test for update request', () => {
    it('should return a updated product', (done) => {
      //Arrange
      const mockData = generateOneProduct();
      const id = mockData.id;
      const dto: UpdateProductDTO = {
        ...mockData,
        categoryId: generateOneCategory().id,
      };

      productsService.update(id, { ...dto }).subscribe((response) => {
        expect(response).toEqual(mockData);
        done();
      });
      //Act

      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.url).toContain(id);
      expect(req.request.method).toEqual('PUT');
      //Assert
    });
  });

  describe('test for delete request', () => {
    it('should call delete product', (done) => {
      //Arrange
      const mockData = generateOneProduct();
      const id = mockData.id;

      productsService.delete(id).subscribe((response) => {
        expect(response).toBeTrue();
        done();
      });
      //Act

      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(true);
      expect(req.request.url).toContain(id);
      expect(req.request.method).toEqual('DELETE');
      //Assert
    });
  });

  describe('test for getOne request', () => {
    it('should return a product', (done) => {
      //Arrange
      const mockData = generateOneProduct();
      const id = mockData.id;

      productsService.getOne(id).subscribe((response) => {
        expect(response).toEqual(mockData);
        done();
      });

      //Act
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.url).toContain(id);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
      //Assert
    });

    it('should return the right message when status code is 404', (done) => {
      //Arrange
      const id = '1';
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError,
      };

      productsService.getOne(id).subscribe({
        error: (error: any) => {
          expect(error).toEqual('El producto no existe');
          done();
        },
      });

      //Act
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
      //Assert
    });

    it('should return the right message when status code is 401', (done) => {
      //Arrange
      const id = '1';
      const msgError = '401 message';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError,
      };

      productsService.getOne(id).subscribe({
        error: (error: any) => {
          expect(error).toEqual('No estas permitido');
          done();
        },
      });

      //Act
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
      //Assert
    });

    it('should return the right message when status code is 409', (done) => {
      //Arrange
      const id = '1';
      const msgError = '409 message';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError,
      };

      productsService.getOne(id).subscribe({
        error: (error: any) => {
          expect(error).toEqual('Algo esta fallando en el server');
          done();
        },
      });

      //Act
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
      //Assert
    });

    it('should return the right message when status code is 500', (done) => {
      //Arrange
      const id = '1';
      const msgError = '500 message';
      const mockError = {
        status: HttpStatusCode.InternalServerError,
        statusText: msgError,
      };

      productsService.getOne(id).subscribe({
        error: (error: any) => {
          expect(error).toEqual('Ups algo salio mal');
          done();
        },
      });

      //Act
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
      //Assert
    });
  });
});
