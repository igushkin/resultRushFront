import {Component} from '@angular/core';
import {LoginRequest} from "../../../model/LoginRequest";
import {AuthService} from "../../../service/impl/AuthService";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  tmpLogin: string = "";
  tmpPassword: string = "";

  constructor(private authService: AuthService) {
  }

  onRegister() {
    let loginRequest = new LoginRequest(this.tmpLogin, this.tmpPassword);
    this.authService.register(loginRequest);
  }

  onLogin() {
    let loginRequest = new LoginRequest(this.tmpLogin, this.tmpPassword);
    this.authService.login(loginRequest);
  }
}
