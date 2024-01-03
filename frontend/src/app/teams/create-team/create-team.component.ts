import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/team.service';
import { FullUser } from 'src/app/types/full-user';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent {
  users: FullUser[] = [];

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const companyIdFromRoute = Number(routeParams.get('companyId'));
    this.teamService
      .getCompanyUsers(companyIdFromRoute)
      .subscribe((users) => (this.users = users));
  }
}
