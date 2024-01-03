import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';


import { NavbarComponent } from './navbar/navbar.component';
import { NameToInitialPipe } from './navbar/name-to-initial.pipe';
import { LoginComponent } from './login/login.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, NameToInitialPipe, LoginComponent, UserRegistryComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
