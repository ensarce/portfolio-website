import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AnimationService } from '../../services/animation.service';
import { SeoService } from '../../services/seo.service';
import { ContentManagementService, HomePageContent } from '../../admin/services/content-management.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homePageContent: HomePageContent = {
    heroTitle: 'Merhaba, Ben Bir Yazılım Geliştiricisiyim',
    heroSubtitle: 'C#, .NET, Angular ve Sağlık Sistemleri alanında uzmanlaşmış bir geliştirici olarak, kullanıcı odaklı çözümler üretiyorum.',
    shortBio: 'Yaklaşık 5 yıldır yazılım geliştirme alanında çalışan bir profesyonel olarak, özellikle sağlık sektöründe entegre sistemler üzerine yoğunlaştım. Geliştirdiğim çözümlerle hastanelerde verimliliği artırmayı ve hasta deneyimini iyileştirmeyi hedefliyorum.'
  };

  // Technology stack data
  technologies = [
    { name: 'C#', level: 90, icon: 'fab fa-microsoft' },
    { name: '.NET', level: 85, icon: 'fas fa-network-wired' },
    { name: 'Angular', level: 80, icon: 'fab fa-angular' },
    { name: 'SQL', level: 75, icon: 'fas fa-database' },
    { name: 'REST API', level: 85, icon: 'fas fa-exchange-alt' },
    { name: 'DevExpress', level: 70, icon: 'fas fa-chart-bar' },
    { name: 'WordPress', level: 65, icon: 'fab fa-wordpress' },
    { name: 'Agent Jobs', level: 75, icon: 'fas fa-tasks' },
    { name: 'Automation Systems', level: 80, icon: 'fas fa-robot' }
  ];
  
  // Featured projects data
  featuredProjects = [
    {
      title: 'Hasta Bileklik Takip Sistemi',
      description: 'Hastanelerde hasta konumunu gerçek zamanlı takip eden IoT tabanlı bir sistem.',
      technologies: ['C#', '.NET', 'Angular', 'SQL']
    },
    {
      title: 'Oda Durum Takip Ekranı',
      description: 'Hastane odalarının doluluk durumunu gösteren dijital ekran sistemi.',
      technologies: ['Angular', 'REST API', 'DevExpress']
    },
    {
      title: 'Radyoloji İstek Sistemi',
      description: 'Radyoloji departmanı için entegre istek ve raporlama sistemi.',
      technologies: ['C#', '.NET', 'SQL', 'Agent Jobs']
    }
  ];
  
  constructor(
    private router: Router,
    private animationService: AnimationService,
    private seoService: SeoService,
    private contentService: ContentManagementService
  ) {}
  
  ngOnInit() {
    // Set SEO metadata
    this.seoService.updateMetaTags(
      'Ana Sayfa - Yazılım Geliştirici Portföyü',
      'C#, .NET, Angular ve Sağlık Sistemleri alanında uzmanlaşmış bir yazılım geliştiricisinin portföyü. Projeler, yetenekler ve iletişim bilgileri.',
      'yazılım geliştirici, C#, .NET, Angular, sağlık sistemleri, portföy',
      'assets/images/portfolio-preview.jpg'
    );
    
    // Load content from service
    this.contentService.getHomePageContent().subscribe(content => {
      this.homePageContent = {...content};
    });
    
    // Initialize animations after view loads
    setTimeout(() => {
      this.animationService.initScrollAnimations();
      this.animationService.initHoverEffects();
    }, 100);
  }
  
  navigateToProjects() {
    this.router.navigate(['/projects']);
  }
  
  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}