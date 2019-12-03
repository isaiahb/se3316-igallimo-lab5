import { Injectable, Injector } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {HttpInterceptor} from "@angular/common/http";

@Injectable()
export class TokenService implements HttpInterceptor{

	constructor(private cookieService: CookieService, private injector: Injector) {}

	intercept(req, next) {
		let tokenReq = req.clone({
			setHeaders: {
				auth: this.cookieService.get('auth')
			}
		});
		return next.handle(tokenReq);
	}

}
