import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from './types/team';
import { Project } from './types/project';
import { FullUser } from './types/full-user';
import { BehaviorSubject } from 'rxjs';
import { LoganRoy } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // TODO: REMOVE HARDCODED COMPANY
  currentCompanyId: number = 6;

  // TODO: REMOVE HARDCODED USER
  private currentUserSource = new BehaviorSubject<FullUser>(LoganRoy);
  currentUser = this.currentUserSource.asObservable();

  private teamToViewSource = new BehaviorSubject<Team | null>(null);
  teamToView = this.teamToViewSource.asObservable();

  constructor(private http: HttpClient) {}

  getTeams() {
    return this.currentUserSource.getValue().admin
      ? this.http.get<Team[]>(`api/company/${this.currentCompanyId}/teams`)
      : this.http.get<Team[]>(
          `api/team/userTeams/${this.currentUserSource.getValue().id}`
        );
  }

  getProjects(teamId: number) {
    return this.http.get<Project[]>(
      `api/company/${this.currentCompanyId}/teams/${teamId}/projects`
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

  setTeamToView(team: Team): void {
    this.teamToViewSource.next(team);
  }
}
