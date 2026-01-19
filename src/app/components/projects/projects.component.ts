// Projects section displaying portfolio items with hover effects

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tags: string;
  image: string;
  link?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'HeyKiddo™ Huddle',
      description: 'A complete social and emotional curriculum for kids aged 5-12.',
      tags: 'LMS, SEL, Web Development, ExtJS, Node.js, Bootstrap, Azure',
      image: 'HKHuddle.png',
      link: 'https://hey-kiddo.com/schools',
    },
    {
      title: 'HeyKiddo™ Talk',
      description: 'Award Winning Pocket Coach. (2020)',
      tags: 'Twilio, SMS/MMS, API, PHP, Azure',
      image: 'HKTalk.png',
    },
    {
      title: 'HeyKiddo™ Talk 2.0',
      description: 'Android / iOS smart app for coaching parents',
      tags: 'NativeScript, MongoDB, Node.js, Angular, Azure, iOS, Android',
      image: 'HKTalk2.0.png',
      link: 'https://hey-kiddo.com/families',
    },
    {
      title: 'RVI - OneLook',
      description: 'Enterprise document management application.',
      tags: 'Web Development, PHP, RPGLE, ExtJs(Sencha)',
      image: 'OneLookSubfile.png',
      link: 'https://realvisionsoftware.com',
    },
  ];
}
