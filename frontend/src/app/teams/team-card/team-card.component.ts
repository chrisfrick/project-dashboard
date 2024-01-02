import { Component, Input } from '@angular/core';
import { TeamService } from 'src/app/team.service';
import { Team } from 'src/app/types/team';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css'],
})
export class TeamCardComponent {
  @Input()
  team!: Team;

  projectCount = 0;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService
      .getProjects(6, this.team.id!)
      .subscribe((projects) => (this.projectCount = projects.length));
  }
}
