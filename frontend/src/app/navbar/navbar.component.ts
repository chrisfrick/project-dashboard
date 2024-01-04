import { Component } from '@angular/core';
import { NameToInitialPipe } from './name-to-initial.pipe';
import { FullUser } from '../types/full-user';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../styles.css'],
})
export class NavbarComponent {
  currentUser: FullUser | null = null;
  // firstName = 'Kenny';
  // lastName = 'Worth';

  // userIsAdmin = false;

  isMenuOpen = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
