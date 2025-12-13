import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService, Project } from '../../services/portfolio-data.service';
import { AnimationService } from '../../services/animation.service';
import { SeoService } from '../../services/seo.service';

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
  
  constructor(
    private portfolioDataService: PortfolioDataService,
    private animationService: AnimationService,
    private seoService: SeoService
  ) {}
  
  async ngOnInit() {
    // Set SEO metadata
    this.seoService.updateMetaTags(
      'Projeler - Yazılım Geliştirici Portföyü',
      'Sağlık sistemleri, web uygulamaları ve CMS entegrasyonları gibi projelerim.',
      'yazılım geliştirici, C#, .NET, Angular, projeler, sağlık sistemleri',
      'assets/images/projects-preview.jpg'
    );
    
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