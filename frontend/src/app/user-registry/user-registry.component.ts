import { Component, OnInit } from '@angular/core';

interface UserData {
  name: string;
  email: string;
  team: string;
  active: boolean;
  admin: boolean;
  status: string;
  [key: string]: string | boolean;
}

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})
export class UserRegistryComponent implements OnInit {
  dummyData: UserData[] = [  // CALL GET REQUEST FOR USERS
    { name: 'Chris Purnell', email: 'asdf@gmail.com', team: 'Mcdon', active: true, admin: false, status: 'JOINED' },
    { name: 'Frank Fournier', email: 'eopiorogm@gmail.com', team: 'popeyes', active: false, admin: true, status: 'PENDING' },
    { name: 'Will Marttala', email: 'hrthr@gmail.com', team: '', active: false, admin: false, status: 'PENDING' },
    { name: 'Helena Makendegue', email: 'hh35rthhrthrth@gmail.com', team: 'hererherherherhre', active: true, admin: true, status: 'PENDING' },
  ];

  ngOnInit() {
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
}
