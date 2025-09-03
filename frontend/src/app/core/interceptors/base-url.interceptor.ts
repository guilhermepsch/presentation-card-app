import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function baseUrlInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  const baseUrl = 'http://localhost:3000';

  const url = req.url.startsWith('http') ? req.url : `${baseUrl}${req.url}`;
  const cloned = req.clone({ url });

  return next(cloned);
}
