import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles.css']
})
export class LoginComponent {
  username = '';
  password = '';
  showLoginPopup = false;

  constructor(private router: Router) { }

  checkLogin(): void {
    if (this.username === 'a' && this.password === 'a') { // change to HTTP request for authentication
      // if (admin)
        // route to select company 
      // else
        // route to announcements
    } else {
      this.showLoginPopup = true;
    }
  }

}
