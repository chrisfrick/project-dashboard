import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FullUser } from 'src/app/types/full-user';
import { Team } from 'src/app/types/team';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent {
  users: FullUser[] = [];

  newTeam: Team = {
    name: '',
    description: '',
    teammates: [],
  };

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const companyIdFromRoute = Number(routeParams.get('companyId'));
    this.dataService
      .getCompanyUsers(companyIdFromRoute)
      .subscribe((users) => (this.users = users));
  }
}
