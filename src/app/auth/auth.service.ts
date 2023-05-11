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
    let localToken =this.getLocalToken();
    if (localToken == null) {
      return;
    }
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
          this.setLocalToken(data);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  getLocalToken():Token|null{
    if (localStorage.getItem('token') == null) {
      console.error('token doesnt exists in local storage');
      return null;
    }
    let localToken: Token = JSON.parse(localStorage.getItem('token')!);
    return localToken;
  }

  setLocalToken(token:Token){
    console.log('saving token to local storage');
    localStorage.setItem('token', JSON.stringify(token));
  }
}
