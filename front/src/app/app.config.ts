import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors} from '@angular/common/http';
import {environment} from '../environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([
            (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
                req = req.clone({
                    url: `${environment['apiUrl']}${req.url}`
                });

                return next(req);
            }
        ]))
    ]
};
