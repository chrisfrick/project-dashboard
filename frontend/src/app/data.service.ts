import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from './types/team';
import { Project } from './types/project';
import { FullUser } from './types/full-user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // TODO: REMOVE HARDCODED COMPANY
  currentCompanyId: number = 6;

  constructor(private http: HttpClient) {}

  getTeams(companyId: number) {
    return this.http.get<Team[]>(`api/company/${companyId}/teams`);
  }

  getProjects(companyId: number, teamId: number) {
    return this.http.get<Project[]>(
      `api/company/${companyId}/teams/${teamId}/projects`
    );
  }

  getCompanyUsers(companyId: number) {
    return this.http.get<FullUser[]>(`api/company/${companyId}/users`);
  }

  createTeam(team: Team) {
    return this.http.post<Team>(
      `api/company/${this.currentCompanyId}/team`,
      team
    );
  }
}
