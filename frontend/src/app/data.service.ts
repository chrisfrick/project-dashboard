import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from './types/team';
import { Project } from './types/project';
import { FullUser } from './types/full-user';
import { BehaviorSubject } from 'rxjs';
import { LoganRoy } from 'src/data';
import Announcement from './types/announcement';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // TODO: REMOVE HARDCODED COMPANY
  currentCompanyId: number | undefined = undefined;

  // TODO: REMOVE HARDCODED USER
  private currentUserSource = new BehaviorSubject<FullUser | null>(LoganRoy);
  currentUser = this.currentUserSource.asObservable();

  private teamToViewSource = new BehaviorSubject<Team | null>(null);
  teamToView = this.teamToViewSource.asObservable();

  constructor(private http: HttpClient) {}

  getAnnouncements() {
    return this.http.get<Announcement[]>(
      `api/company/${this.currentCompanyId}/announcements`
    )
  }

  createAnnouncement(announcement: Announcement) {
    return this.http.post<Announcement>(
      `api/company/${this.currentCompanyId}/announcements`,
      announcement
    )
  }

  getTeams() {
    return this.currentUserSource.getValue()!.admin
      ? this.http.get<Team[]>(`api/company/${this.currentCompanyId}/teams`)
      : this.http.get<Team[]>(
          `api/team/userTeams/${this.currentUserSource.getValue()!.id}`
        );
  }

  getProjects(teamId: number) {
    return this.http.get<Project[]>(
      `api/company/${this.currentCompanyId}/teams/${teamId}/projects`
    );
  }

  updateProject(project: Project) {
    return this.http.patch<Project>(`api/projects/${project.id}`, project);
  }

  getCompanyUsers() {
    return this.http.get<FullUser[]>(
      `api/company/${this.currentCompanyId}/users`
    );
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

  createProject(name: string, description: string) {
    const team = this.teamToViewSource.getValue();
    let projectToCreate = {
      name,
      description,
      active: true,
      team: team as Team,
    };
    return this.http.post<Project>(
      `api/company/${this.currentCompanyId}/teams/${team?.id}/projects`,
      projectToCreate
    );
  }

  setCurrentUser(user: FullUser | null) {
    this.currentUserSource.next(user);
  }

  updateCompanyId(newCompanyId: number | undefined) {
    this.currentCompanyId = newCompanyId;
  }
}
