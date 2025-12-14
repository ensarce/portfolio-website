import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { ContentManagementService, SiteSettings } from './admin/services/content-management.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio-website';
  siteSettings: SiteSettings = {
    theme: {
      primaryColor: '',
      backgroundColor: '',
      textColor: '',
      darkMode: true
    },
    hero: {
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: '',
      isActive: true
    },
    about: {
      title: '',
      developerBackgroundTitle: '',
      developerBackground: '',
      healthcareExperienceTitle: '',
      healthcareExperience: '',
      apiIntegrationsTitle: '',
      apiIntegrations: [],
      agentJobsTitle: '',
      agentJobs: [],
      dashboardProjectsTitle: '',
      dashboardProjects: [],
      imageUrl: '',
      isActive: true
    },
    skills: {
      title: '',
      certificatesTitle: '',
      isActive: true
    },
    projects: {
      title: '',
      isActive: true
    },
    contact: {
      title: '',
      contactFormTitle: '',
      contactInfoTitle: '',
      socialMediaTitle: '',
      downloadCvTitle: '',
      emailLabel: '',
      phoneLabel: '',
      addressLabel: '',
      namePlaceholder: '',
      emailPlaceholder: '',
      subjectPlaceholder: '',
      messagePlaceholder: '',
      sendMessageButton: '',
      email: '',
      phone: '',
      address: '',
      socialLinks: [],
      isActive: true
    },
    footer: {
      copyrightText: '',
      socialLinks: [],
      isActive: true
    },
    isActive: true
  };

  constructor(private contentService: ContentManagementService) {}

  ngOnInit(): void {
    this.contentService.getSiteSettings().subscribe(settings => {
      this.siteSettings = {...settings};
    });
  }
}