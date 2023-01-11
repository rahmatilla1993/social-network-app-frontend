import {Injectable, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {TokenStorageService} from "../services/token-storage.service";
import {NotificationService} from "../services/notification.service";

@Injectable({
  providedIn: 'root'
})
class ErrorInterceptorService implements HttpInterceptor{

  constructor(
    private tokenService : TokenStorageService,
    private notificationService : NotificationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError(
        //@ts-ignore
        err => {
        if(err.status === 401) {
          this.tokenService.logout()
        }
          const error = err.error.username + ' or ' + err.error.password
          this.notificationService.showSnackBar(error)
      }))
  }
}

export const ERROR_INTERCEPTOR : Provider = {
  provide : HTTP_INTERCEPTORS,
  useClass : ErrorInterceptorService,
  multi : true
}
