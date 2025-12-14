import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { 
  ContentManagementService, 
  PortfolioContent,
  HeroSection,
  AboutSection,
  SkillsSection,
  Skill,
  ProjectsSection,
  Project,
  ContactSection,
  SiteSettings,
  ThemeSettings
} from '../../services/content-management.service';

@Component({
  selector: 'app-content-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss']
})
export class ContentManagementComponent implements OnInit {
  portfolioContent: PortfolioContent = {
    siteSettings: {
      theme: {
        primaryColor: '',
        backgroundColor: '',
        textColor: '',
        darkMode: true
      },
      footerText: ''
    },
    heroSection: {
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: '',
      isActive: true
    },
    aboutSection: {
      content: '',
      isActive: true
    },
    skillsSection: {
      isActive: true,
      skills: []
    },
    projectsSection: {
      isActive: true,
      projects: []
    },
    contactSection: {
      isActive: true,
      email: '',
      github: '',
      linkedin: '',
      whatsapp: ''
    }
  };

  // New items for adding
  newSkill: Skill = {
    name: '',
    level: 0,
    category: '',
    order: 0,
    isActive: true
  };

  newProject: Project = {
    title: '',
    description: '',
    technologies: [],
    order: 0,
    isActive: true
  };

  newTechnology: string = '';

  activeTab: string = 'hero';

  constructor(private contentService: ContentManagementService) {}

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    this.contentService.getContent().subscribe(content => {
      this.portfolioContent = {...content};
      // Initialize arrays if they don't exist
      if (!this.portfolioContent.skillsSection.skills) this.portfolioContent.skillsSection.skills = [];
      if (!this.portfolioContent.projectsSection.projects) this.portfolioContent.projectsSection.projects = [];
    });
  }

  async saveContent(): Promise<void> {
    await this.contentService.updateContent(this.portfolioContent);
    alert('İçerik başarıyla kaydedildi!');
  }

  addSkill(): void {
    if (this.newSkill.name && this.newSkill.level > 0) {
      this.portfolioContent.skillsSection.skills.push({...this.newSkill});
      this.newSkill = { name: '', level: 0, category: '', order: 0, isActive: true };
    }
  }

  removeSkill(index: number): void {
    this.portfolioContent.skillsSection.skills.splice(index, 1);
  }

  addProject(): void {
    if (this.newProject.title && this.newProject.description) {
      this.portfolioContent.projectsSection.projects.push({...this.newProject});
      this.newProject = { title: '', description: '', technologies: [], order: 0, isActive: true };
    }
  }

  removeProject(index: number): void {
    this.portfolioContent.projectsSection.projects.splice(index, 1);
  }

  addTechnology(): void {
    if (this.newTechnology.trim()) {
      this.newProject.technologies.push(this.newTechnology.trim());
      this.newTechnology = '';
    }
  }

  removeTechnology(index: number): void {
    this.newProject.technologies.splice(index, 1);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}