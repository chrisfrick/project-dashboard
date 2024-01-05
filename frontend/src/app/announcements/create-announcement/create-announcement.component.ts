import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import Announcement from 'src/app/types/announcement';
import { BasicUser, defaultBasicUser } from 'src/app/types/basic-user';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css'],
})
export class CreateAnnouncementComponent implements OnInit {
  @Output() closeCreate = new EventEmitter<void>();

  currentBasicUser: BasicUser = defaultBasicUser();
  currentUserFullName: string = '';
  createForm: FormGroup = new FormGroup({
    title: new FormControl<string>(''),
    message: new FormControl<string>(''),
  });

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.currentUser.subscribe((currentUser) => {
      if (currentUser) {
        this.currentUserFullName =
          currentUser.profile.firstName + ' ' + currentUser?.profile.lastName;
        this.currentBasicUser = {
          id: currentUser.id,
          profile: currentUser.profile,
          admin: currentUser.admin,
          active: currentUser.active,
          status: currentUser.status,
        };
      }
    });
  }

  passCloseCreate() {
    this.closeCreate.emit();
  }

  onSubmit() {
    let newAnn: Announcement = {
      date: new Date(),
      title: this.createForm.controls['title'].value,
      message: this.createForm.controls['message'].value,
      author: this.currentBasicUser,
    };
    this.dataService.createAnnouncement(newAnn).subscribe((response) => { window.location.reload(); });
    this.passCloseCreate();
  }
}
