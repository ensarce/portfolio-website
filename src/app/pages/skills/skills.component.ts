import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService, SkillCategory } from '../../services/portfolio-data.service';
import { AnimationService } from '../../services/animation.service';
import { SeoService } from '../../services/seo.service';
import { ContentManagementService, SiteSettings } from '../../admin/services/content-management.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  technologies: SkillCategory[] = [];
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
      title: 'Yeteneklerim',
      certificatesTitle: 'Sertifikalarım',
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
    private portfolioDataService: PortfolioDataService,
    private animationService: AnimationService,
    private seoService: SeoService,
    private contentService: ContentManagementService
  ) {}
  
  async ngOnInit() {
    // Set SEO metadata
    this.seoService.updateMetaTags(
      'Yetenekler - Yazılım Geliştirici Portföyü',
      'C#, .NET, Angular ve diğer teknolojilerdeki yeteneklerim ve uzmanlık alanlarım.',
      'yazılım geliştirici, C#, .NET, Angular, yetenekler, uzmanlık',
      'assets/images/skills-preview.jpg'
    );
    
    // Load content from service
    this.contentService.getSiteSettings().subscribe(settings => {
      this.siteSettings = {...settings};
    });
    
    const skillsObservable = await this.portfolioDataService.getSkills();
    skillsObservable.subscribe(skills => {
      this.technologies = skills;
      
      // Initialize animations after data loads
      setTimeout(() => {
        this.animationService.initScrollAnimations();
        this.animationService.initHoverEffects();
      }, 100);
    });
  }
}