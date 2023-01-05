import {Injectable, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
class AuthInterceptorService implements HttpInterceptor{
  private TOKEN_HEADER_KEY: string = 'Authorization';

  constructor(private tokenService : TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = req
    const token = this.tokenService.getToken()
    if(token !== null)
      authRequest = req.clone({headers : req.headers.set(this.TOKEN_HEADER_KEY,token)})
    return next.handle(authRequest)
  }
}

export const AUTH_INTERCEPTOR : Provider = {
  provide : HTTP_INTERCEPTORS,
  useClass : AuthInterceptorService,
  multi : true
}
