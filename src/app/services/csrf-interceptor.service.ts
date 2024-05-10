import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Lee el token CSRF de las cookies
    const csrfToken = this.getCookie('XSRF-TOKEN');
    //console.log(csrfToken);

    // Si el token CSRF existe, clona la solicitud y establece el encabezado 'X-XSRF-TOKEN'
    if (csrfToken) {
      req = req.clone({
        setHeaders: {
          'X-XSRF-TOKEN': csrfToken
        }
      });
    }

    // Maneja la solicitud modificada
    return next.handle(req);
  }

  // Función para leer una cookie
  getCookie(name: string): string {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
}
