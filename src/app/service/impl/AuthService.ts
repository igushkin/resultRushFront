import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../model/LoginRequest";
import {Router} from "@angular/router";
import {Token} from "../../model/Token";

export const REGISTER_URL_TOKEN = new InjectionToken<string>('url');
export const LOGIN_URL_TOKEN = new InjectionToken<string>('url');
export const TOKEN_KEY = new InjectionToken<string>('token_key');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(REGISTER_URL_TOKEN) private registerUrl: string,
              @Inject(LOGIN_URL_TOKEN) private loginUrl: string,
              @Inject(TOKEN_KEY) private tokenKey: string,
              private http: HttpClient,
              private router: Router
  ) {
  }

  public register(loginRequest: LoginRequest) {


    this.http.post<Boolean>(this.registerUrl, loginRequest).subscribe(result => {

      if (result) {
        this.login(loginRequest);
      } else {
        alert("Smth went wrong");
      }
    });
  }

  public login(loginRequest: LoginRequest) {
    this.http.post<Token>(this.loginUrl, loginRequest).subscribe(x => {

      localStorage.setItem(this.tokenKey, x.token);
      this.router.navigateByUrl('');
    });
  }
}
