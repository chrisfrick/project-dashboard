import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

interface UserData {
  name: string;
  email: string;
  team: string;
  active: boolean;
  admin: boolean;
  status: string;
}

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  admin?: boolean | undefined;
}

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css'],
})
export class UserRegistryComponent implements OnInit {
  dummyData: UserData[] = [
    // CHANGE TO CALL GET REQUEST FOR USERS
    {
      name: 'Chris Purnell',
      email: 'asdf@gmail.com',
      team: 'Mcdon',
      active: true,
      admin: false,
      status: 'JOINED',
    },
    {
      name: 'Frank Fournier',
      email: 'eopiorogm@gmail.com',
      team: 'popeyes',
      active: false,
      admin: true,
      status: 'PENDING',
    },
    {
      name: 'Will Marttala',
      email: 'hrthr@gmail.com',
      team: '',
      active: false,
      admin: false,
      status: 'PENDING',
    },
    {
      name: 'Helena Makendegue',
      email: 'hh35rthhrthrth@gmail.com',
      team: 'hererherherherhre',
      active: true,
      admin: true,
      status: 'PENDING',
    },
  ];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.currentUser.subscribe((user) => {
      // Check for logged-in user
      if (!user) {
        this.router.navigateByUrl('/login');
        return;
      }
      // Disallow non-admin access
      if (!user.admin) {
        this.router.navigateByUrl('/announcements');
      }
    });
  }

  // overlay visibility
  overlayVisible: boolean = false;
  openAddUserOverlay() {
    this.overlayVisible = true;
  }
  closeAddUserOverlay(): void {
    this.overlayVisible = false;
  }

  // dropdown text dissapears
  selectedOption: boolean | null = null;
  onSelectFocus() {
    this.selectedOption = true;
  }

  // create a new user
  newUser: NewUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    admin: undefined,
  };
  // add user to database/update table
  submitUser(): void {
    console.log('NAME: ', this.newUser.firstName, this.newUser.lastName);
    console.log('EMAIL: ', this.newUser.email);
    console.log(
      'PASSWORD: ',
      this.newUser.password,
      this.newUser.confirmPassword
    );
    console.log('IS ADMIN: ', this.newUser.admin);
    this.closeAddUserOverlay();
  }

  // some sort of delete user function
  deleteUser(user: UserData): void {}

  editUser(user: UserData): void {}
}
