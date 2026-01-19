// Profile section displaying personal information and photo

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private firebaseService = inject(FirebaseService);

  age = this.firebaseService.age;
  location = this.firebaseService.location;
  name = this.firebaseService.name;
}
