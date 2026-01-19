// Abilities section displaying skills and tools with star ratings from Firebase

import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService, AbilityItem } from '../../services/firebase.service';

@Component({
  selector: 'app-abilities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './abilities.component.html',
  styleUrl: './abilities.component.scss',
})
export class AbilitiesComponent {
  private firebaseService = inject(FirebaseService);

  skills = this.firebaseService.skills;
  tools = this.firebaseService.tools;
  isLoading = this.firebaseService.isLoading;

  // Split skills into two columns
  skillsCol1 = computed(() => {
    const items = this.skills();
    return items.slice(0, Math.ceil(items.length / 2));
  });

  skillsCol2 = computed(() => {
    const items = this.skills();
    return items.slice(Math.ceil(items.length / 2));
  });

  // Split tools into two columns
  toolsCol1 = computed(() => {
    const items = this.tools();
    return items.slice(0, Math.ceil(items.length / 2));
  });

  toolsCol2 = computed(() => {
    const items = this.tools();
    return items.slice(Math.ceil(items.length / 2));
  });

  // Generate array for star rating display
  getStars(value: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, i) => i < value);
  }
}
