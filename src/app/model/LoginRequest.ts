export class LoginRequest {

  private login: string;
  private password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
