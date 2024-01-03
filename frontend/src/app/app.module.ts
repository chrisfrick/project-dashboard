import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NameToInitialPipe } from './navbar/name-to-initial.pipe';
import { TeamsComponent } from './teams/teams.component';
import { TeamCardComponent } from './teams/team-card/team-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateTeamComponent } from './teams/create-team/create-team.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NameToInitialPipe,
    TeamsComponent,
    TeamCardComponent,
    CreateTeamComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
