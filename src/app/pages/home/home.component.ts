import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AnimationService } from '../../services/animation.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Hero section data
  heroTitle = 'Merhaba, Ben Bir Yazılım Geliştiricisiyim';
  heroSubtitle = 'C#, .NET, Angular ve Sağlık Sistemleri alanında uzmanlaşmış bir geliştirici olarak, kullanıcı odaklı çözümler üretiyorum.';
  
  // Short bio data
  shortBio = 'Yaklaşık 5 yıldır yazılım geliştirme领域inde çalışan bir profesyonel olarak, özellikle sağlık sektöründe entegre sistemler üzerine yoğunlaştım. Geliştirdiğim çözümlerle hastanelerde verimliliği artırmayı ve hasta deneyimini iyileştirmeyi hedefliyorum.';
  
  // Technology stack data
  technologies = [
    { name: 'C#', level: 90 },
    { name: '.NET', level: 85 },
    { name: 'Angular', level: 80 },
    { name: 'SQL', level: 75 },
    { name: 'REST API', level: 85 },
    { name: 'DevExpress', level: 70 },
    { name: 'WordPress', level: 65 },
    { name: 'Agent Jobs', level: 75 },
    { name: 'Automation Systems', level: 80 }
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
    private seoService: SeoService
  ) {}
  
  ngOnInit() {
    // Set SEO metadata
    this.seoService.updateMetaTags(
      'Ana Sayfa - Yazılım Geliştirici Portföyü',
      'C#, .NET, Angular ve Sağlık Sistemleri alanında uzmanlaşmış bir yazılım geliştiricisinin portföyü. Projeler, yetenekler ve iletişim bilgileri.',
      'yazılım geliştirici, C#, .NET, Angular, sağlık sistemleri, portföy',
      'assets/images/portfolio-preview.jpg'
    );
    
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