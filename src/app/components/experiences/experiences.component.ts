// Experiences section displaying education and career history

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  title: string;
  subtitle?: string;
  period: string;
  role: string;
  description: string;
  highlights?: string[];
  link?: string;
  linkText?: string;
}

interface Award {
  title: string;
  date: string;
}

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
})
export class ExperiencesComponent {
  education: Experience[] = [
    {
      title: 'Northwestern State University',
      period: 'Jan 2011 - May 2017',
      role: "Bachelor's - Computer Information Systems, Application Development",
      description:
        'Focused on application development with a concentration in Java, JavaScript, HTML, CSS3, SQL, PHP, and object-oriented programming. Also gained experience in business management, working in administration and finance.',
      link: 'https://nsula.edu',
      linkText: 'Northwestern State University',
    },
  ];

  awards: Award[] = [
    {
      title: 'Blackbaud Off The Grid - "Best use of Microsoft Power Platform"',
      date: 'August 2021',
    },
  ];

  careers: Experience[] = [
    {
      title: 'Blackbaud',
      subtitle: 'Charleston, SC (Remote)',
      period: 'Dec 2020 - Present',
      role: 'Senior Software Engineer',
      description:
        'Leading enterprise-scale cloud migrations and automation initiatives for multi-tenant SaaS products serving 6,000+ customers.',
      highlights: [
        'Led cloud migrations of Gen7, CRM/BBIS, and BBNC applications from private datacenters to Azure with zero data loss',
        'Architected PowerShell-based Azure Runbooks and reusable cmdlet libraries for tenant lifecycle operations',
        'Drove platform security hardening including certificate rotation to Azure Key Vault and HTTPS-only enforcement',
        'Leading Oracle Forms migration and Researchpoint import modernization',
      ],
      link: 'https://www.blackbaud.com/',
      linkText: 'blackbaud.com',
    },
    {
      title: 'HeyKiddo LLC',
      subtitle: 'Philadelphia, PA (Remote)',
      period: 'Jan 2019 - Dec 2025',
      role: 'Director of Technology',
      description:
        'Architected and led development of an AI-powered parent coaching platform serving 1,000+ users, securing $2M+ in NSF funding.',
      highlights: [
        'Architected agentic AI infrastructure using OpenAI APIs with agent-to-agent decision-making systems',
        'Designed cloud-native microservices platform with 5+ TypeScript services on Azure App Services',
        'Built cross-platform mobile app using NativeScript with automated iOS/Android deployments via Fastlane',
        'Architected secure Azure infrastructure spanning App Services, PostgreSQL, Cosmos DB, and Functions',
        'Led PHP-to-TypeScript backend migration for HeyKiddo Huddle LMS',
        'Secured 3x NSF funding totaling $2M+ through technical product innovation',
      ],
      link: 'https://hey-kiddo.com',
      linkText: 'hey-kiddo.com',
    },
    {
      title: 'Real Vision Software',
      subtitle: 'Alexandria, LA (Remote)',
      period: 'May 2015 - Dec 2020',
      role: 'Software Engineer',
      description:
        'Developed full-stack features for enterprise document management applications across IBM i and Windows platforms.',
      highlights: [
        'Developed full-stack features for OneLook using Ext JS, PHP, and Java with REST and WebSocket protocols',
        'Built Java utilities for automated document processing including TIFF-to-PNG conversion and PII redaction',
        'Integrated Topaz signature pad hardware with court document workflows',
        'Developed Chrome extension for automated web scraping and data injection',
        'Initiated Azure cloud migration project leveraging AI Document Intelligence',
      ],
      link: 'https://realvisionsoftware.com',
      linkText: 'realvisionsoftware.com',
    },
  ];
}
