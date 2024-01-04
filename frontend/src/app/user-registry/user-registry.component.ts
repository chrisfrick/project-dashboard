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

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    // CHANGE THIS TO THE USER COMPANY
    this.dataService.getCompanyUsers(6).subscribe((testData) => {
      this.userData = testData;
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
    this.addOverlayVisible = false;
  }

  // addUser overlay visibility
  editOverlayVisible: boolean = false;
  openEditUserOverlay() {
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
    console.log('NAME: ', this.newUser.firstName, this.newUser.lastName)
    console.log('EMAIL: ', this.newUser.email)
    console.log('PASSWORD: ', this.newUser.password, this.newUser.confirmPassword)
    console.log('IS ADMIN: ', this.newUser.admin)
    this.closeAddUserOverlay();
  }

  // some sort of delete user function
  deleteUser(): void {

  }

  editUser(user: NewUser): void {

  }
}
