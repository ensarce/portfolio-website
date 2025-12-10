import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService, SkillCategory } from '../../services/portfolio-data.service';
import { AnimationService } from '../../services/animation.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  technologies: SkillCategory[] = [];
  
  constructor(
    private portfolioDataService: PortfolioDataService,
    private animationService: AnimationService,
    private seoService: SeoService
  ) {}
  
  ngOnInit() {
    // Set SEO metadata
    this.seoService.updateMetaTags(
      'Yetenekler - Yazılım Geliştirici Portföyü',
      'C#, .NET, Angular ve diğer teknolojilerdeki yeteneklerim ve uzmanlık alanlarım.',
      'yazılım geliştirici, C#, .NET, Angular, yetenekler, uzmanlık',
      'assets/images/skills-preview.jpg'
    );
    
    this.portfolioDataService.getSkills().subscribe(skills => {
      this.technologies = skills;
      
      // Initialize animations after data loads
      setTimeout(() => {
        this.animationService.initScrollAnimations();
        this.animationService.initHoverEffects();
      }, 100);
    });
  }
}