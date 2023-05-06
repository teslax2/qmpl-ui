import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from './token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseEndpoint =
    'https://qmpl.auth.eu-central-1.amazoncognito.com/oauth2';
  private tokenEndpoint = '/token';
  private redirectEndpoint = 'https://teslax2.github.io/qmpl-ui';
  private clientId = '3ojt0f6465n9i5hmffac81u9kj';

  constructor(private http: HttpClient) {}

  login() {
    window.location.href = `${this.baseEndpoint}/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectEndpoint}&scope=openid+email`;
  }

  token(code: string) {
    this.http
      .post<Token>(
        `${this.baseEndpoint}${this.tokenEndpoint}`,
        new HttpParams({
          fromObject: {
            grant_type: 'authorization_code',
            client_id: this.clientId,
            code: code,
            redirect_uri: this.redirectEndpoint,
          },
        }).toString(),
        {
          headers: new HttpHeaders().set(
            'Content-Type',
            'application/x-www-form-urlencoded'
          ),
        }
      )
      .subscribe({
        next: (data) => {
          console.log('token received');
          localStorage.setItem('token', JSON.stringify(data));
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  refreshToken() {
    if (localStorage.getItem('token') == null) {
      console.error('local token doesnt exists');
    }
    let localToken: Token = JSON.parse(localStorage.getItem('token')!);
    this.http
      .post<Token>(
        `${this.baseEndpoint}${this.tokenEndpoint}`,
        new HttpParams({
          fromObject: {
            grant_type: 'refresh_token',
            client_id: this.clientId,
            refreshToken: localToken.refresh_token,
          },
        }).toString(),
        {
          headers: new HttpHeaders().set(
            'Content-Type',
            'application/x-www-form-urlencoded'
          ),
        }
      )
      .subscribe({
        next: (data) => {
          console.log('refresh token received');
          localStorage.setItem('token', JSON.stringify(data));
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }
}
