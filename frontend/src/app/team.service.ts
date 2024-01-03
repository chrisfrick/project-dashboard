import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from './types/team';
import { Project } from './types/project';
import { FullUser } from './types/full-user';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeams(companyId: number) {
    return this.http.get<Team[]>(`company/${companyId}/teams`);
  }

  getProjects(companyId: number, teamId: number) {
    return this.http.get<Project[]>(
      `company/${companyId}/teams/${teamId}/projects`
    );
  }

  getCompanyUsers(companyId: number) {
    return this.http.get<FullUser[]>(`company/${companyId}/users`);
  }
}
