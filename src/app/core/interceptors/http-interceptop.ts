import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const updatedRequest: HttpRequest<any> = Object.assign(httpRequest, { withCredentials: true });
        return next.handle(updatedRequest);
    }
}
