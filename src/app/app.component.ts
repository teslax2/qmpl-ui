import { Component } from '@angular/core';
import { Route, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'qmpl-ui';
  private code = '';
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['code'] != null) {
        this.code = params['code'];
        console.log(this.code);

        this.http
          .post<Token>(
            'https://qmpl.auth.eu-central-1.amazoncognito.com/oauth2/token',
            new HttpParams({
              fromObject: {
                grant_type: 'authorization_code',
                client_id: '3ojt0f6465n9i5hmffac81u9kj',
                code: this.code,
                redirect_uri: 'https://teslax2.github.io/qmpl-ui',
              },
            }).toString(),
            {headers : new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            }
          )
          .subscribe({
            next: (data) => {console.log(data); localStorage.setItem('token', JSON.stringify(data));},
            error: (e) => console.error(e),
            complete: () => console.info('complete'),
          });
      }
    });
  }

  login() {
    window.location.href =
      'https://qmpl.auth.eu-central-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=3ojt0f6465n9i5hmffac81u9kj&redirect_uri=https://teslax2.github.io/qmpl-ui&scope=openid+email';
  }
}

interface Token{
    access_token : string;
    id_token: string;
    token_type: string;
    expires_in: number;
}
