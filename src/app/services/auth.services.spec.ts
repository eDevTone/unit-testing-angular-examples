import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { Auth } from '../models/auth.model';
import { AuthService } from './auth.service';
import { TokenService } from './token.services';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return a token', (done) => {
      //Arrange
      // spyOn(tokenService, 'getToken').and.returnValue('123');
      const mockData: Auth = {
        access_token: '321321312',
      };
      const email = 'me@test.com';
      const pass = '123';
      //Act

      authService.login(email, pass).subscribe((token) => {
        //Assert
        expect(token).toEqual(mockData);
        done();
      });

      //http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    });

    it('should call saveToken', (done) => {
      //Arrange
      // spyOn(tokenService, 'getToken').and.returnValue('123');
      const mockData: Auth = {
        access_token: '321321312',
      };
      const email = 'me@test.com';
      const pass = '123';
      spyOn(tokenService, 'saveToken').and.callThrough(); // This call the method but dont execute the real function only the spy
      //Act

      authService.login(email, pass).subscribe((token) => {
        //Assert
        expect(token).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledWith(mockData.access_token);
        done();
      });

      //http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    });
  });
});
