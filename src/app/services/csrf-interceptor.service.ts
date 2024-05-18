import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Lee el token CSRF de las cookies
    const csrfToken = this.getCookie('XSRF-TOKEN');
    console.log('Document Cookies: ', document.cookie);

    // Si el token CSRF existe, clona la solicitud y establece el encabezado 'X-XSRF-TOKEN'
    console.log('TokenCSRF: ', csrfToken);
    if (csrfToken) {
      req = req.clone({
        headers: req.headers.set('X-XSRF-TOKEN', csrfToken)
      });
    }

    // Clona la solicitud y establece la propiedad withCredentials en true
    const clonedReq = req.clone({ withCredentials: true });

    // Maneja la solicitud modificada
    return next.handle(clonedReq);
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
