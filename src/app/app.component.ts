import { Component } from '@angular/core';
import { Route, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from './auth/token';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'qmpl-ui';
  private code = '';
  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['code'] != null) {
        this.code = params['code'];
        console.log(this.code);
        this.auth.token(this.code);
      }
    });
  }

  login() {
    this.auth.login();
  }

  refreshToken() {
    this.auth.refreshToken();
  }
}
