import { Component } from '@angular/core';
import Announcement from '../types/announcement';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent {
  userIsAdmin: boolean = false;
  announcements: Announcement[] = [];
  isCreateShown: boolean = false;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    // Check for logged in currentUser
    this.dataService.currentUser.subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('/login');
        return;
      }
      // Check if logged-in user is admin
      this.userIsAdmin = user.admin;
    });

    const author = {
      id: 1,
      profile: {
        firstName: 'Drew',
        lastName: 'Layton',
        email: 'drew@internet.com',
        phone: '555-555-5555',
      },
      admin: true,
      active: true,
      status: 'PENDING',
    };

    const message1 =
      '1Lorem ipsum our announcements go here! Our business has been going great and we are going to announce the winners of employee of the month! Lorem ipsum Lorem ipsum our announcements go here! Our business has been going great and we are going to announce the winners of employee of the month! Lorem ipsum  Lorem ipsum our announcements go here! Our business has been going great and we are going to announce the winners of employee of the month! Lorem ipsum';
    const message2 =
      '2Lorem ipsum our announcements go here! Our business has been going great and we are going to announce the winners of employee of the month! Lorem ipsum Lorem ipsum our announcements go here! Our business has been going great and we are going to announce the winners of employee of the month! Lorem ipsum  Lorem ipsum our announcements go here! Our business has been going great and we are going to announce the winners of employee of the month! Lorem ipsum';

    this.announcements = [
      {
        id: 1,
        date: new Date(),
        title: 'Title1',
        message: message1,
        author: author,
      },
      {
        id: 2,
        date: new Date(),
        title: 'Title2',
        message: message2,
        author: author,
      },
    ];
  }

  toggleCreate() {
    this.isCreateShown = !this.isCreateShown;
  }

  closeCreate() {
    this.isCreateShown = false;
  }
}
