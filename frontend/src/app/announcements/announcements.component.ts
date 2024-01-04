import { Component } from '@angular/core';
import Announcement from '../types/announcement';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent {
  announcements: Announcement[] = [];
  isCreateShown: boolean = false;

  ngOnInit(): void {
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
