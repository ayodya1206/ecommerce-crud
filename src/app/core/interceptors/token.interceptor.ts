import { Injectable,Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/modules/login/services/login.service';

@Injectable({
  providedIn:'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authService = this.injector.get(LoginService);
    let jwtToken = request.clone({
      setHeaders: {
        AuthorizationToken: 'bearer' + authService.getToke()
      }
    })
    return next.handle(jwtToken);
  }
}
