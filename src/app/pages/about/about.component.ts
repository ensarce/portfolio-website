import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../services/animation.service';
import { SeoService } from '../../services/seo.service';
import { ContentManagementService, SiteSettings } from '../../admin/services/content-management.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  siteSettings: SiteSettings = {
    theme: {
      primaryColor: '#00c3ff',
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
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
      title: 'Hakkımda',
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

  constructor(
    private animationService: AnimationService,
    private seoService: SeoService,
    private contentService: ContentManagementService
  ) {}
  
  ngOnInit() {
    // Set SEO metadata
    this.seoService.updateMetaTags(
      'Hakkımda - Yazılım Geliştirici Portföyü',
      '5 yıllık yazılım geliştirme deneyimim ve sağlık sektöründe çalıştığım projeler hakkında bilgiler.',
      'yazılım geliştirici, C#, .NET, Angular, sağlık sistemleri, deneyim',
      'assets/images/about-preview.jpg'
    );
    
    // Load content from service
    this.contentService.getSiteSettings().subscribe(settings => {
      this.siteSettings = {...settings};
    });
    
    // Initialize animations after view loads
    setTimeout(() => {
      this.animationService.initScrollAnimations();
      this.animationService.initHoverEffects();
    }, 100);
  }
}