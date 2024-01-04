import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css'],
})
export class CreateAnnouncementComponent implements OnInit {
  @Output() closeCreate = new EventEmitter<void>();

  currentUserFullName: string = '';
  createForm: FormGroup = new FormGroup({
    title: new FormControl<string>(''),
    message: new FormControl<string>(''),
  });

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.currentUser.subscribe((currentUser) => {
      this.currentUserFullName =
        currentUser.profile.firstName + ' ' + currentUser.profile.lastName;
    });
  }

  passCloseCreate() {
    this.closeCreate.emit();
  }
}
