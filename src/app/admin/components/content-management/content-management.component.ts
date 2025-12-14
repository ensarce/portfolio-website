import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { 
  ContentManagementService, 
  SiteSettings
} from '../../services/content-management.service';
import { 
  HeroSettings, 
  AboutSection, 
  ContactSection, 
  FooterSection, 
  ApiIntegration, 
  AgentJob, 
  DashboardProject, 
  SocialLink,
  SkillsSection,
  ProjectsSection
} from '../../models/content-models';

@Component({
  selector: 'app-content-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss']
})
export class ContentManagementComponent implements OnInit {
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

  newSocialLink: SocialLink = {
    id: 0,
    name: '',
    url: '',
    icon: '',
    isActive: true
  };

  newApiIntegration: ApiIntegration = {
    id: 0,
    name: '',
    description: '',
    isActive: true
  };

  newAgentJob: AgentJob = {
    id: 0,
    name: '',
    description: '',
    isActive: true
  };

  newDashboardProject: DashboardProject = {
    id: 0,
    name: '',
    description: '',
    isActive: true
  };

  activeTab: string = 'home';

  constructor(private contentService: ContentManagementService) {}

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    this.contentService.getSiteSettings().subscribe(settings => {
      this.siteSettings = {...settings};
      
      // Initialize arrays if they don't exist
      if (!this.siteSettings.about.apiIntegrations) this.siteSettings.about.apiIntegrations = [];
      if (!this.siteSettings.about.agentJobs) this.siteSettings.about.agentJobs = [];
      if (!this.siteSettings.about.dashboardProjects) this.siteSettings.about.dashboardProjects = [];
      if (!this.siteSettings.contact.socialLinks) this.siteSettings.contact.socialLinks = [];
      if (!this.siteSettings.footer.socialLinks) this.siteSettings.footer.socialLinks = [];
    });
  }

  async saveSiteSettings(): Promise<void> {
    await this.contentService.updateSiteSettings(this.siteSettings);
    alert('Site ayarları başarıyla kaydedildi!');
  }

  addSocialLink(section: 'contact' | 'footer'): void {
    const newLink = {...this.newSocialLink};
    newLink.id = Date.now(); // Simple ID generation
    
    if (newLink.name && newLink.url && newLink.icon) {
      if (section === 'contact') {
        this.siteSettings.contact.socialLinks.push(newLink);
      } else {
        this.siteSettings.footer.socialLinks.push(newLink);
      }
      this.newSocialLink = { id: 0, name: '', url: '', icon: '', isActive: true };
    }
  }

  removeSocialLink(section: 'contact' | 'footer', index: number): void {
    if (section === 'contact') {
      this.siteSettings.contact.socialLinks.splice(index, 1);
    } else {
      this.siteSettings.footer.socialLinks.splice(index, 1);
    }
  }

  addApiIntegration(): void {
    const newIntegration = {...this.newApiIntegration};
    newIntegration.id = Date.now(); // Simple ID generation
    
    if (newIntegration.name && newIntegration.description) {
      this.siteSettings.about.apiIntegrations.push(newIntegration);
      this.newApiIntegration = { id: 0, name: '', description: '', isActive: true };
    }
  }

  removeApiIntegration(index: number): void {
    this.siteSettings.about.apiIntegrations.splice(index, 1);
  }

  addAgentJob(): void {
    const newJob = {...this.newAgentJob};
    newJob.id = Date.now(); // Simple ID generation
    
    if (newJob.name && newJob.description) {
      this.siteSettings.about.agentJobs.push(newJob);
      this.newAgentJob = { id: 0, name: '', description: '', isActive: true };
    }
  }

  removeAgentJob(index: number): void {
    this.siteSettings.about.agentJobs.splice(index, 1);
  }

  addDashboardProject(): void {
    const newProject = {...this.newDashboardProject};
    newProject.id = Date.now(); // Simple ID generation
    
    if (newProject.name && newProject.description) {
      this.siteSettings.about.dashboardProjects.push(newProject);
      this.newDashboardProject = { id: 0, name: '', description: '', isActive: true };
    }
  }

  removeDashboardProject(index: number): void {
    this.siteSettings.about.dashboardProjects.splice(index, 1);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  
  // Helper method to get next ID for items
  private getNextId(array: any[]): number {
    return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
  }
}