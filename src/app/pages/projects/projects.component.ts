import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService, Project } from '../../services/portfolio-data.service';
import { AnimationService } from '../../services/animation.service';
import { SeoService } from '../../services/seo.service';
import { ContentManagementService, SiteSettings } from '../../admin/services/content-management.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories = ['All', 'Healthcare', 'Web Application', 'CMS Integration'];
  selectedCategory = 'All';
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
      title: '',
      certificatesTitle: '',
      isActive: true
    },
    projects: {
      title: 'Projelerim',
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
      'Projeler - Yazılım Geliştirici Portföyü',
      'Sağlık sistemleri, web uygulamaları ve CMS entegrasyonları gibi projelerim.',
      'yazılım geliştirici, C#, .NET, Angular, projeler, sağlık sistemleri',
      'assets/images/projects-preview.jpg'
    );
    
    // Load content from service
    this.contentService.getSiteSettings().subscribe(settings => {
      this.siteSettings = {...settings};
    });
    
    const projectsObservable = await this.portfolioDataService.getProjects();
    projectsObservable.subscribe(projects => {
      this.projects = projects;
      this.filteredProjects = projects;
      
      // Initialize animations after data loads
      setTimeout(() => {
        this.animationService.initScrollAnimations();
        this.animationService.initHoverEffects();
      }, 100);
    });
  }
  
  async filterProjects(category: string) {
    this.selectedCategory = category;
    const projectsObservable = await this.portfolioDataService.getProjectsByCategory(category);
    projectsObservable.subscribe(projects => {
      this.filteredProjects = projects;
      
      // Reinitialize animations after filtering
      setTimeout(() => {
        this.animationService.initHoverEffects();
      }, 100);
    });
  }
}