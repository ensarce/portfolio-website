import { Project as PortfolioProject, SkillCategory } from '../../services/portfolio-data.service';

// Hero Section Model
export interface HeroSettings {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

// Skill Model
export interface Skill {
  id: number;
  name: string;
  level: number;
  category: 'Backend' | 'Frontend' | 'Tools';
  order: number;
  isActive: boolean;
}

// Project Model
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  order: number;
  isActive: boolean;
  category: string;
}

// About Section Model
export interface AboutSection {
  title: string;
  developerBackgroundTitle: string;
  developerBackground: string;
  healthcareExperienceTitle: string;
  healthcareExperience: string;
  apiIntegrationsTitle: string;
  apiIntegrations: ApiIntegration[];
  agentJobsTitle: string;
  agentJobs: AgentJob[];
  dashboardProjectsTitle: string;
  dashboardProjects: DashboardProject[];
  imageUrl: string;
  isActive: boolean;
}

// Contact Section Model
export interface ContactSection {
  title: string;
  contactFormTitle: string;
  contactInfoTitle: string;
  socialMediaTitle: string;
  downloadCvTitle: string;
  emailLabel: string;
  phoneLabel: string;
  addressLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  sendMessageButton: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: SocialLink[];
  isActive: boolean;
}

// Skills Section Model
export interface SkillsSection {
  title: string;
  certificatesTitle: string;
  isActive: boolean;
}

// Projects Section Model
export interface ProjectsSection {
  title: string;
  isActive: boolean;
}

// Footer Section Model
export interface FooterSection {
  copyrightText: string;
  socialLinks: SocialLink[];
  isActive: boolean;
}

// Supporting Models
export interface ApiIntegration {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface AgentJob {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface DashboardProject {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon: string;
  isActive: boolean;
}

// Site Settings Model
export interface SiteSettings {
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    darkMode: boolean;
  };
  hero: HeroSettings;
  about: AboutSection;
  skills: SkillsSection;
  projects: ProjectsSection;
  contact: ContactSection;
  footer: FooterSection;
  isActive: boolean;
}

// Section-based data contracts
export interface WebsiteSections {
  hero: HeroSettings;
  about: AboutSection;
  skills: SkillsSection;
  projects: ProjectsSection;
  contact: ContactSection;
  footer: FooterSection;
}