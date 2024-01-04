import { Component } from '@angular/core';
import { FullUser } from '../types/full-user';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent {
  companies: string[] = ["FedEx", "Cook Systems", "Google"]

  onSubmit(selection: string) {
    console.log(selection)
  }
}
