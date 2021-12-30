import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { ConfigSettings } from '../config/config.settings';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs/operators';
import CryptoJS from 'crypto-js'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  activeRequests: number = 0;
  skippUrls = [
    '/home/order-notification'
  ];

  constructor(
    private configSettings: ConfigSettings,
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const secret = this.getHeaderKey();
    let authReq: any = req.clone({
      headers: req.headers.set('secret', secret).set('Access-Control-Allow-Origin', '*')
    });
    let displayLoadingScreen = true;
    for (const skippUrl of this.skippUrls) {
      if (new RegExp(skippUrl).test(authReq.url)) {
        displayLoadingScreen = false;
        break;
      }
    }
    if (displayLoadingScreen) {
      if (this.activeRequests === 0) {
      }
      this.activeRequests++;
      return next.handle(authReq).pipe(tap(() => {
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
        }
      }),
        finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
          }
        })
      )
    } else {
      return next.handle(authReq);
    }

  }

  getHeaderKey() {
    let d = Date.now();
    const timeStamp = new Date(d + 30000).toISOString();
    const authType = 'cms';
    const key = timeStamp + '###' + authType;
    return this.aesEncrypt(key);
  }

  aesEncrypt(data) {
    let iv = environment.IV;
    let key = environment.ENC_KEY;
    let cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
  }

}
