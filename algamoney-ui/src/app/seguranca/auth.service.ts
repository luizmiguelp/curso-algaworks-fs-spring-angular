import { environment } from './../../environments/environment';
import { JwtHelper } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
    ) {
      this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
      this.carregarToken();
    }


    login(usuario: string, senha: string): Promise<void> {

      const headers = new Headers();

      headers.append('Content-type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

      const body = `username=${usuario}&password=${senha}&grant_type=password`;

      return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then(response => {

        this.armazenarToken(response.json().access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = response.json();
          if (responseJson.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválidos!' );
          }
        }
        return Promise.reject(response);
      });
    }

    obterNovoAccessToken(): Promise<void> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

      const body = 'grant_type=refresh_token';

      return this.http.post(this.oauthTokenUrl, body,
          { headers, withCredentials: true })
        .toPromise()
        .then(response => {
          this.armazenarToken(response.json().access_token);

          return Promise.resolve(null);
        })
        .catch(response => {
          return Promise.resolve(null);
        });
    }

    limpartAccessToken() {
      localStorage.removeItem('token');
      this.jwtPayload = null;
    }
    isAccessTokenInvalid() {
      const token = localStorage.getItem('token');

      return !token || this.jwtHelper.isTokenExpired(token);
    }

    temPermissao(permissao: string) {
      return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
    }

    temQualquerPermissao(roles) {
      for (const role of roles) {
        if (this.temPermissao(role)) {
          return true;
        }
      }

      return false;
    }

    private armazenarToken(token: string) {
      this.jwtPayload = this.jwtHelper.decodeToken(token);
      localStorage.setItem('token', token);

    }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

}
