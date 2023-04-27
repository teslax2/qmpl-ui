import { Component } from '@angular/core';
import { Route, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'qmpl-ui';
  private code = '';
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['code'] != null) {
        this.code = params['code'];
        console.log(this.code);

        this.http.post(
          'https://qmpl.auth.eu-central-1.amazoncognito.com/oauth2/token',
          {
            grant_type: 'authorization_code',
            client_id:'3ojt0f6465n9i5hmffac81u9kj',
            code:this.code,
            redirect_uri:'https://teslax2.github.io/qmpl-ui'
          },
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic M29qdDBmNjQ2NW45aTVobWZmYWM4MXU5a2o',
            }),
          }
        ).subscribe({
          next: (data) => console.log(data),
          error: (e) => console.error(e),
          complete: () => console.info('complete'),
        });
      }
    });
  }
}
