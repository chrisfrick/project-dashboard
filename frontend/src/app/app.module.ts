import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NameToInitialPipe } from './navbar/name-to-initial.pipe';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnnouncementsComponent } from './announcements/announcements.component';

@NgModule({
  declarations: [AppComponent,
    SelectCompanyComponent, AnnouncementsComponent, NavbarComponent, NameToInitialPipe],
  imports: [BrowserModule, AppRoutingModule,
    ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
