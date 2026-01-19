# Matthew Leleux - Personal Resume

A modern, responsive personal resume website built with Angular and Tailwind CSS.

🔗 **Live Site:** [matthewleleux.me](https://matthewleleux.me)

## Tech Stack

- **Angular 21** - Standalone components with Signals
- **Tailwind CSS v4** - Utility-first styling
- **Firebase Realtime Database** - Dynamic skills/tools data
- **tsParticles** - Animated particle background
- **Azure App Service** - Hosting via GitHub Actions

## Development

```bash
# Install dependencies
npm install

# Start dev server
ng serve
```

## Build & Deploy

Builds are automated via GitHub Actions on push to `master`. The workflow builds the Angular app and deploys to Azure App Service.

```bash
# Manual build
ng build
```

## Project Structure

```text
src/app/
├── components/
│   ├── hero/          # Particle background + intro
│   ├── navbar/        # Sticky bottom navigation
│   ├── profile/       # About me section
│   ├── experiences/   # Career & education
│   ├── abilities/     # Skills & tools from Firebase
│   ├── projects/      # Portfolio cards
│   └── contact/       # Contact links + footer
└── services/
    └── firebase.service.ts
```
