import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Team } from '../types/team';
import { Router } from '@angular/router';
import { Project } from '../types/project';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  userIsAdmin: boolean = false;
  team: Team | null = null;
  createProjectShown: boolean = true;

  projects: Project[] = [
    {
      id: 10,
      name: 'Shuttle Launch',
      description: 'Shuttle launch in Japan to be led by COO, Roman Roy.',
      active: true,
      team: {
        id: 13,
        name: 'Team 3',
        description: 'Roman & Gerri',
        teammates: [
          {
            id: 21,
            profile: {
              firstName: 'Roman',
              lastName: 'Roy',
              email: 'rroy@email.com',
              phone: '(333) 333-3333',
            },
            admin: false,
            active: true,
            status: 'PENDING',
          },
          {
            id: 26,
            profile: {
              firstName: 'Gerri',
              lastName: 'Kellman',
              email: 'gkellman@email.com',
              phone: '(888) 888-8888',
            },
            admin: true,
            active: true,
            status: 'JOINED',
          },
        ],
      },
    },
    {
      id: 10,
      name: 'Shuttle Launch',
      description: 'Shuttle launch in Japan to be led by COO, Roman Roy.',
      active: true,
      team: {
        id: 13,
        name: 'Team 3',
        description: 'Roman & Gerri',
        teammates: [
          {
            id: 21,
            profile: {
              firstName: 'Roman',
              lastName: 'Roy',
              email: 'rroy@email.com',
              phone: '(333) 333-3333',
            },
            admin: false,
            active: true,
            status: 'PENDING',
          },
          {
            id: 26,
            profile: {
              firstName: 'Gerri',
              lastName: 'Kellman',
              email: 'gkellman@email.com',
              phone: '(888) 888-8888',
            },
            admin: true,
            active: true,
            status: 'JOINED',
          },
        ],
      },
    },
    {
      id: 10,
      name: 'Shuttle Launch',
      description: 'Shuttle launch in Japan to be led by COO, Roman Roy.',
      active: true,
      team: {
        id: 13,
        name: 'Team 3',
        description: 'Roman & Gerri',
        teammates: [
          {
            id: 21,
            profile: {
              firstName: 'Roman',
              lastName: 'Roy',
              email: 'rroy@email.com',
              phone: '(333) 333-3333',
            },
            admin: false,
            active: true,
            status: 'PENDING',
          },
          {
            id: 26,
            profile: {
              firstName: 'Gerri',
              lastName: 'Kellman',
              email: 'gkellman@email.com',
              phone: '(888) 888-8888',
            },
            admin: true,
            active: true,
            status: 'JOINED',
          },
        ],
      },
    },
  ];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.currentUser.subscribe(
      (user) => (this.userIsAdmin = user.admin)
    );
    this.dataService.teamToView.subscribe((team) => (this.team = team));
    if (!this.team || !this.team.id) {
      // this.router.navigateByUrl('/teams');
    } else {
      // this.dataService
      //   .getProjects(this.team.id!)
      //   .subscribe((projects) => (this.projects = projects));
    }
  }

  closeCreateProject(): void {
    this.createProjectShown = false;
  }
}
