import { Component } from '@angular/core';
import { Team } from '../types/team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  teams: Team[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    // TODO: don't hardcode the company
    this.teamService.getTeams(6).subscribe((teams) => (this.teams = teams));
  }
}
