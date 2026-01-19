// Firebase service for fetching skills, tools, and about me data from Firebase Realtime Database

import { Injectable, signal } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, ref, onValue, Database } from 'firebase/database';
import { environment } from '../../environments/environment';

// PURPOSE: Interface for skill/tool items with title and rating value
export interface AbilityItem {
  title: string;
  value: number;
}

// PURPOSE: Interface for about me data containing birth date
export interface AboutMeData {
  Year: number;
  Month: number;
  Day: number;
  Location: string;
  Name: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app: FirebaseApp;
  private db: Database;

  // Signals for reactive state management
  readonly skills = signal<AbilityItem[]>([]);
  readonly tools = signal<AbilityItem[]>([]);
  readonly age = signal<number>(0);
  readonly location = signal<string>('');
  readonly name = signal<string>('');
  readonly isLoading = signal<boolean>(true);

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);

    this.loadData();
  }

  // PURPOSE: Load all data from Firebase
  // OUTPUT: Updates signals with fetched data
  private loadData(): void {
    this.loadAboutMe();
    this.loadSkills();
    this.loadTools();
  }

  // PURPOSE: Load about me data and calculate age
  private loadAboutMe(): void {
    const aboutMeRef = ref(this.db, 'AboutMe');
    onValue(aboutMeRef, (snapshot) => {
      const data = snapshot.val() as AboutMeData;
      if (data) {
        const birthDate = new Date(data.Year, data.Month, data.Day);
        this.age.set(this.calculateAge(birthDate));
        this.location.set(data.Location);
        this.name.set(data.Name);
      }
    });
  }

  // PURPOSE: Load skills from Firebase and sort by value
  private loadSkills(): void {
    const skillsRef = ref(this.db, 'Skills');
    onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = this.parseAbilityData(data);
        this.skills.set(items);
      }
    });
  }

  // PURPOSE: Load tools from Firebase and sort by value
  private loadTools(): void {
    const toolsRef = ref(this.db, 'Tools');
    onValue(toolsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = this.parseAbilityData(data);
        this.tools.set(items);
        this.isLoading.set(false);
      }
    });
  }

  // PURPOSE: Parse Firebase data and convert hex-encoded keys to ASCII
  // INPUT: Raw Firebase data object
  // OUTPUT: Sorted array of AbilityItem objects
  private parseAbilityData(data: Record<string, number>): AbilityItem[] {
    const items: AbilityItem[] = Object.entries(data).map(([key, value]) => ({
      title: this.hexToAscii(key),
      value: value,
    }));

    // Sort by value (descending), then by title (ascending)
    return items.sort((a, b) => {
      if (a.value !== b.value) return b.value - a.value;
      return a.title.localeCompare(b.title);
    });
  }

  // PURPOSE: Convert hex-encoded string segments to ASCII
  // INPUT: String with optional hex segments wrapped in tildes (~)
  // OUTPUT: Decoded ASCII string
  private hexToAscii(str: string): string {
    const startIndex = str.indexOf('~');
    if (startIndex < 0) return str;

    const endIndex = str.lastIndexOf('~');
    const hex = str.substring(startIndex + 1, endIndex);

    let decoded = '';
    for (let i = 0; i < hex.length; i += 2) {
      decoded += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
    }

    return (str.substring(0, startIndex) + decoded.trim() + str.substring(endIndex + 1)).trim();
  }

  // PURPOSE: Calculate age from birth date
  // INPUT: Birth date
  // OUTPUT: Age in years
  private calculateAge(birthDate: Date): number {
    const diffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
