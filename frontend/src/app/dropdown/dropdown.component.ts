import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Input() options: string[] = [];
  @Input() button: string = '';

  isMenuOpen: boolean = false;
  selection: string = '';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isButton(): boolean {
    return this.button != '';
  }

  isSelection(): boolean {
    return this.selection != '';
  }

  onClick(selection: string) {
    this.selection = selection;
    this.toggleMenu();
  }

  onSubmit() {}
}
