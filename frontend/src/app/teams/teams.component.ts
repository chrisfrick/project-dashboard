import { Component } from '@angular/core';
import { Team } from '../types/team';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  userIsAdmin: boolean = false;
  teams: Team[] = [];
  createTeamShown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // const routeParams = this.route.snapshot.paramMap;
    // const companyIdFromRoute = Number(routeParams.get('companyId'));
    this.dataService.getTeams().subscribe((teams) => (this.teams = teams));
    this.dataService.currentUser.subscribe(
      (user) => (this.userIsAdmin = user.admin)
    );
  }

  closeModal(): void {
    this.createTeamShown = false;
  }
}
