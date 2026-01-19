// Sticky navigation bar that appears on scroll with section links

import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isVisible = signal(false);
  activeSection = signal('profile');
  isMobileMenuOpen = signal(false);

  navItems: NavItem[] = [
    { label: 'Profile', href: 'profile' },
    { label: 'Experiences', href: 'experiences' },
    { label: 'Abilities', href: 'abilities' },
    { label: 'Projects', href: 'projects' },
    { label: 'Contact', href: 'contact' },
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const heroHeight = document.getElementById('top')?.offsetHeight || 700;
    this.isVisible.set(window.scrollY > heroHeight - 100);

    // Update active section based on scroll position
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    const scrollBottom = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // If user has scrolled to the bottom of the page, highlight the last section
    if (scrollBottom >= documentHeight - 50) {
      this.activeSection.set(this.navItems[this.navItems.length - 1].href);
      return;
    }

    // Check each section from bottom to top to find current active
    for (let i = this.navItems.length - 1; i >= 0; i--) {
      const section = document.getElementById(this.navItems[i].href);
      if (section) {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop) {
          this.activeSection.set(this.navItems[i].href);
          return;
        }
      }
    }

    // Default to first section
    this.activeSection.set(this.navItems[0].href);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection.set(sectionId);
      this.isMobileMenuOpen.set(false);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }
}
