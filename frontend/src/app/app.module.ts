import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { NameToInitialPipe } from './navbar/name-to-initial.pipe';
import { TeamsComponent } from './teams/teams.component';
import { TeamCardComponent } from './teams/team-card/team-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateTeamComponent } from './teams/create-team/create-team.component';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { NameCardComponent } from './teams/name-card/name-card.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { LoginComponent } from './login/login.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NameToInitialPipe,
    TeamsComponent,
    TeamCardComponent,
    CreateTeamComponent,
    SelectCompanyComponent,
    AnnouncementsComponent,
    NameCardComponent,
    DropdownComponent,
    LoginComponent, 
    UserRegistryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
