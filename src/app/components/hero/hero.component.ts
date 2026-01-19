// Hero component displaying the animated particle background with name and title

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgParticlesService, NgxParticlesModule } from '@tsparticles/angular';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine, ISourceOptions } from '@tsparticles/engine';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, NgxParticlesModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  id = 'tsparticles';

  particlesOptions: ISourceOptions = {
    fullScreen: { enable: false }, // Contain particles within parent container
    particles: {
      number: { value: 200, density: { enable: true } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0, max: 1 },
        animation: { enable: true, speed: 2, sync: false },
      },
      size: {
        value: { min: 1, max: 4 },
        animation: { enable: false },
      },
      move: {
        enable: true,
        speed: 0.17,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
      links: { enable: false },
    },
    detectRetina: true,
  };

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }

  particlesLoaded(container: Container): void {
    // Particles loaded successfully
  }
}
