import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent {
  companies: string[] = ["FedEx", "Cook Systems", "Google"]
  isMenuOpen: boolean = false;
  
  companyForm: FormGroup = new FormGroup({
    selectedCompany: new FormControl<string>('', [Validators.required])
  })

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }
}
