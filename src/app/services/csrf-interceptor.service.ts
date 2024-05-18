import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clona la solicitud y establece la propiedad withCredentials en true
    const clonedReq = req.clone({ withCredentials: true });

    // Maneja la solicitud modificada
    return next.handle(clonedReq);
  }
}