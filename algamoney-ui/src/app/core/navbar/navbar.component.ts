import { Router } from '@angular/router';
import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;
  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private router: Router,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }
  logout() {
    this.logoutService.logout()
      .then(() => {
          this.router.navigate(['/login']);
      })
      .catch(error => this.erroHandler.handle(error));
  }
}
