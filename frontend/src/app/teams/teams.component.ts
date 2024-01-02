import { Component } from '@angular/core';
import { Team } from '../types/team';
import { TeamService } from '../team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  teams: Team[] = [];

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const companyIdFromRoute = Number(routeParams.get('companyId'));
    this.teamService
      .getTeams(companyIdFromRoute)
      .subscribe((teams) => (this.teams = teams));
  }
}
