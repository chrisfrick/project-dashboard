import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Team } from '../types/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  team: Team | null = null;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.teamToView.subscribe((team) => (this.team = team));
    if (!this.team) {
      this.router.navigateByUrl('/teams');
    }
  }
}
