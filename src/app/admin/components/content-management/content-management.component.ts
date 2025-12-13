import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { 
  ContentManagementService, 
  HomePageContent, 
  AboutPageContent, 
  ContactPageContent, 
  SocialLink,
  ApiIntegration,
  AgentJob,
  DashboardProject
} from '../../services/content-management.service';

@Component({
  selector: 'app-content-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss']
})
export class ContentManagementComponent implements OnInit {
  homePageContent: HomePageContent = {
    heroTitle: '',
    heroSubtitle: '',
    shortBio: ''
  };

  aboutPageContent: AboutPageContent = {
    title: '',
    developerBackground: '',
    healthcareExperience: '',
    apiIntegrations: [],
    agentJobs: [],
    dashboardProjects: [],
    imageUrl: ''
  };

  contactPageContent: ContactPageContent = {
    title: '',
    email: '',
    phone: '',
    address: '',
    socialLinks: []
  };

  newSocialLink: SocialLink = {
    name: '',
    url: '',
    icon: ''
  };

  newApiIntegration: ApiIntegration = {
    name: '',
    description: ''
  };

  newAgentJob: AgentJob = {
    name: '',
    description: ''
  };

  newDashboardProject: DashboardProject = {
    name: '',
    description: ''
  };

  activeTab: string = 'home';

  constructor(private contentService: ContentManagementService) {}

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    this.contentService.getHomePageContent().subscribe(content => {
      this.homePageContent = {...content};
    });

    this.contentService.getAboutPageContent().subscribe(content => {
      this.aboutPageContent = {...content};
      // Initialize arrays if they don't exist
      if (!this.aboutPageContent.apiIntegrations) this.aboutPageContent.apiIntegrations = [];
      if (!this.aboutPageContent.agentJobs) this.aboutPageContent.agentJobs = [];
      if (!this.aboutPageContent.dashboardProjects) this.aboutPageContent.dashboardProjects = [];
    });

    this.contentService.getContactPageContent().subscribe(content => {
      this.contactPageContent = {...content};
    });
  }

  async saveHomePageContent(): Promise<void> {
    await this.contentService.updateHomePageContent(this.homePageContent);
    alert('Ana sayfa içeriği başarıyla kaydedildi!');
  }

  async saveAboutPageContent(): Promise<void> {
    await this.contentService.updateAboutPageContent(this.aboutPageContent);
    alert('Hakkında sayfası içeriği başarıyla kaydedildi!');
  }

  async saveContactPageContent(): Promise<void> {
    await this.contentService.updateContactPageContent(this.contactPageContent);
    alert('İletişim sayfası içeriği başarıyla kaydedildi!');
  }

  addSocialLink(): void {
    if (this.newSocialLink.name && this.newSocialLink.url && this.newSocialLink.icon) {
      this.contactPageContent.socialLinks.push({...this.newSocialLink});
      this.newSocialLink = { name: '', url: '', icon: '' };
    }
  }

  removeSocialLink(index: number): void {
    this.contactPageContent.socialLinks.splice(index, 1);
  }

  addApiIntegration(): void {
    if (this.newApiIntegration.name && this.newApiIntegration.description) {
      this.aboutPageContent.apiIntegrations.push({...this.newApiIntegration});
      this.newApiIntegration = { name: '', description: '' };
    }
  }

  removeApiIntegration(index: number): void {
    this.aboutPageContent.apiIntegrations.splice(index, 1);
  }

  addAgentJob(): void {
    if (this.newAgentJob.name && this.newAgentJob.description) {
      this.aboutPageContent.agentJobs.push({...this.newAgentJob});
      this.newAgentJob = { name: '', description: '' };
    }
  }

  removeAgentJob(index: number): void {
    this.aboutPageContent.agentJobs.splice(index, 1);
  }

  addDashboardProject(): void {
    if (this.newDashboardProject.name && this.newDashboardProject.description) {
      this.aboutPageContent.dashboardProjects.push({...this.newDashboardProject});
      this.newDashboardProject = { name: '', description: '' };
    }
  }

  removeDashboardProject(index: number): void {
    this.aboutPageContent.dashboardProjects.splice(index, 1);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}