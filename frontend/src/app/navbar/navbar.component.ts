import { Component } from '@angular/core';
import { NameToInitialPipe } from './name-to-initial.pipe';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  firstName = 'Kenny';
  lastName = 'Worth';

  admin = false;

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
