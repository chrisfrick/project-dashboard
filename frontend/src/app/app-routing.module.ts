import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectCompanyComponent } from './select-company/select-company.component';

const routes: Routes = [
  { path: "select-company", component: SelectCompanyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
