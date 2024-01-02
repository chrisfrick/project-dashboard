import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from './types/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeams(companyId: number) {
    return this.http.get<Team[]>(`company/${companyId}/teams`);
  }
}
