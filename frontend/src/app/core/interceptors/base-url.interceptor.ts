import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export function baseUrlInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  const url = req.url.startsWith('http') ? req.url : `${environment.apiUrl}${req.url}`;
  const cloned = req.clone({ url });
  return next(cloned);
}
