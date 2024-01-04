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
  private currentCompanySource = new BehaviorSubject<number>(6);
  currentCompanyId = this.currentCompanySource.asObservable();
  // currentCompanyId: number = 6;

  // TODO: REMOVE HARDCODED USER
  private currentUserSource = new BehaviorSubject<FullUser>(LoganRoy);
  currentUser = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  getTeams() {
    return this.currentUserSource.getValue().admin
      ? this.http.get<Team[]>(`api/company/${this.currentCompanyId}/teams`)
      : this.http.get<Team[]>(
          `api/team/userTeams/${this.currentUserSource.getValue().id}`
        );
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

  updateCompanyId(newCompanyId: number) {
    console.log('updated');
    this.currentCompanySource.next(newCompanyId);
  }
}
