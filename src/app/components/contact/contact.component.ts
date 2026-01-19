// Contact section displaying social links and contact information

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  linkedInUrl = 'https://www.linkedin.com/in/matthew-leleux/';
  email = 'matthew@freshitsolutions.com';
  currentYear = new Date().getFullYear();
}
