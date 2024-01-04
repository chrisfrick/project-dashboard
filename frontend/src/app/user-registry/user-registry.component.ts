import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FullUser } from '../types/full-user';

interface FullUserData {
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
  styleUrls: ['./user-registry.component.css']
})
export class UserRegistryComponent implements OnInit {
  makeAdminBools: string[] = ['true', 'false']
  userData: FullUser[] = [];
  firstNameExist: boolean = true;
  lastNameExist: boolean = true;
  emailExist: boolean = true;
  passwordsMatch: boolean = true;
  passwordExist: boolean = true;
  adminExist: boolean = true;

  // create a new user
  newUser: NewUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    admin: undefined,
  };
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    // CHANGE THIS TO THE USER COMPANY
    this.dataService.getCompanyUsers(6).subscribe((userData) => {
      this.userData = userData;
      console.log('THIS IS TEH DATA')
      console.log(this.userData);
    });
  }

  // addUser overlay visibility
  addOverlayVisible: boolean = false;
  openAddUserOverlay() {
    this.addOverlayVisible = true;
    console.log(this.userData);
  }
  closeAddUserOverlay(): void {
    this.resetNewUser();
    this.addOverlayVisible = false;
  }

  // addUser overlay visibility
  editOverlayVisible: boolean = false;
  openEditUserOverlay(user: FullUser) {
    console.log(user);
    this.editOverlayVisible = true;
  }
  closeEditUserOverlay(): void {
    this.editOverlayVisible = false;
  }

  // dropdown text dissapears
  selectedOption: boolean | null = null;
  onSelectFocus() {
    this.selectedOption = true;
  }


  // add user to database/update table
  submitUser(): void {
    this.resetBools();
    if (this.newUser.firstName === '') {
      this.firstNameExist = false;
    } else if (this.newUser.lastName === '') {
      this.lastNameExist = false;
    } else if (this.newUser.email === '') {
      this.emailExist = false;
    } else if (this.newUser.password !== this.newUser.confirmPassword) {
      this.passwordsMatch = false;
    } else if (this.newUser.password === '') {
      this.passwordExist = false;
    } else if (this.newUser.admin === undefined) {
      this.adminExist = false;
    } else {
      this.dataService.createUser(this.newUser.firstName, this.newUser.lastName, 
        this.newUser.email, this.newUser.password, this.newUser.admin).subscribe(
        (user) => {
          this.userData.push(user);
          this.closeAddUserOverlay();
        },
        (error) => {
          console.log('CREATE USER FAILED!!!')
        }
      );

    }
  }

  resetBools(): void {
    this.firstNameExist = true;
    this.lastNameExist = true;
    this.emailExist = true;
    this.passwordsMatch = true;
    this.passwordExist = true;
    this.adminExist = true;
  }

  resetNewUser(): void {
    this.newUser.firstName = '';
    this.newUser.lastName = '';
    this.newUser.email = '';
    this.newUser.password = '';
    this.newUser.confirmPassword = '';
    this.newUser.admin = undefined;
  }
  

  // some sort of delete user function
  deleteUser(): void {

  }


}
