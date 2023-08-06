import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TOKEN_KEY} from "../../../service/impl/AuthService";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(@Inject(TOKEN_KEY) private tokenKey: string,
              private http: HttpClient,
              private router: Router) {
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('/login');
  }
}
