import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { BasicUser } from 'src/app/types/basic-user';
import { FullUser } from 'src/app/types/full-user';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  userPool: FullUser[] = [];

  blankTeam = {
    name: '',
    description: '',
    teammates: [] as FullUser[],
  };

  teamToCreate = this.blankTeam;

  createTeamForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    selectedUser: new FormControl<FullUser | undefined>(undefined),
  });

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getCompanyUsers()
      .subscribe((users) => (this.userPool = users));
  }

  addTeamMember(): void {
    let userToAdd: FullUser =
      this.createTeamForm.controls['selectedUser'].value;
    this.teamToCreate = {
      ...this.teamToCreate,
      teammates: [...this.teamToCreate.teammates, userToAdd],
    };

    // Remove teammember from selection options
    this.userPool = this.userPool.filter((user) => user.id !== userToAdd.id);
  }

  removeTeamMember(userToRemove: FullUser): void {
    this.teamToCreate = {
      ...this.teamToCreate,
      teammates: this.teamToCreate.teammates.filter(
        (user) => user.id !== userToRemove.id
      ),
    };
    this.userPool = [...this.userPool, userToRemove];
  }

  onSubmit(): void {
    let newTeam = {
      name: this.createTeamForm.controls['name'].value,
      description: this.createTeamForm.controls['description'].value,
      teammates: this.teamToCreate.teammates.map((user) => user as BasicUser),
    };
    this.dataService.createTeam(newTeam).subscribe((response) => {});
    this.teamToCreate = this.blankTeam;
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
