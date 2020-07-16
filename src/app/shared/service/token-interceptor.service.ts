import {Injectable, Injector} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req,nxt) {
  const authService =this.injector.get(AuthService);
  const tokenizedReq = req.clone({
        headers: req.headers.set('authorization', `Bearer ${authService.getToken()}`)
      });
  return nxt.handle(tokenizedReq);
  }
}
