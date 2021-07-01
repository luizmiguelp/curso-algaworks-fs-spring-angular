import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';


@Injectable()
export class LogoutService {


  tokensRevokeUrl: string;

  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) {
      this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
   }

  logout() {

    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
         this.auth.limpartAccessToken();
      });
  }
}
