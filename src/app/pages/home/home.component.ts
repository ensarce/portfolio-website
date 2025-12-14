import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AnimationService } from '../../services/animation.service';
import { SeoService } from '../../services/seo.service';
import { ContentManagementService, SiteSettings } from '../../admin/services/content-management.service';
import { PortfolioDataService, SkillCategory } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  siteSettings: SiteSettings = {
    theme: {
      primaryColor: '#00c3ff',
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      darkMode: true
    },
    hero: {
      title: 'Merhaba, Ben Bir Yazılım Geliştiricisiyim',
      subtitle: 'C#, .NET, Angular ve Sağlık Sistemleri alanında uzmanlaşmış bir geliştirici olarak, kullanıcı odaklı çözümler üretiyorum.',
      ctaText: 'Projelerime Göz Atın',
      ctaLink: '/projects',
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
      title: 'İletişim',
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

  // Technology stack data
  technologies: SkillCategory[] = [];
  
  // Featured projects data
  featuredProjects: any[] = [];
  
  constructor(
    private router: Router,
    private animationService: AnimationService,
    private seoService: SeoService,
    private contentService: ContentManagementService,
    private portfolioDataService: PortfolioDataService
  ) {}
  
  async ngOnInit() {
    // Set SEO metadata
    this.seoService.updateMetaTags(
      'Ana Sayfa - Yazılım Geliştirici Portföyü',
      'C#, .NET, Angular ve Sağlık Sistemleri alanında uzmanlaşmış bir yazılım geliştiricisinin portföyü. Projeler, yetenekler ve iletişim bilgileri.',
      'yazılım geliştirici, C#, .NET, Angular, sağlık sistemleri, portföy',
      'assets/images/portfolio-preview.jpg'
    );
    
    // Load site settings from service
    this.contentService.getSiteSettings().subscribe(settings => {
      this.siteSettings = {...settings};
    });
    
    // Load skills data
    const skillsObservable = await this.portfolioDataService.getSkills();
    skillsObservable.subscribe(skills => {
      this.technologies = skills;
    });
    
    // Load projects data
    const projectsObservable = await this.portfolioDataService.getProjects();
    projectsObservable.subscribe(projects => {
      // Get first 3 projects as featured projects
      this.featuredProjects = projects.slice(0, 3);
    });
    
    // Initialize animations after view loads
    setTimeout(() => {
      this.animationService.initScrollAnimations();
      this.animationService.initHoverEffects();
    }, 100);
  }
  
  navigateToProjects() {
    this.router.navigate([this.siteSettings.hero.ctaLink || '/projects']);
  }
  
  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}