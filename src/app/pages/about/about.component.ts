import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../services/animation.service';
import { SeoService } from '../../services/seo.service';
import { ContentManagementService, AboutPageContent } from '../../admin/services/content-management.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  developerBackground = `
    <p>Yazılım geliştirmesine 5 yıl önce başladım ve o zamandan beri sürekli öğrenmeye ve kendimi geliştirmeye devam ediyorum. 
    Başlangıçta C# ve .NET teknolojileriyle masaüstü uygulamalar geliştirerek kariyerime başladım.</p>
    
    <p>Zamanla web teknolojilerine yönelerek Angular ile frontend geliştirme konusunda da uzmanlaştım. 
    Özellikle sağlık sektöründe çalışmak beni çok ilgilendiriyor çünkü bu alanda geliştirdiğim çözümler 
    doğrudan insan hayatına dokunuyor ve fark yaratıyor.</p>
  `;
  
  healthcareExperience = `
    <p>Sağlık sektöründe 3 yıldır aktif olarak çalışıyorum ve bu süreçte hastanelerde kullanılan çeşitli sistemlerin 
    entegrasyonu ve iyileştirilmesi üzerine projelerde yer aldım. Bu projeler arasında:</p>
    
    <ul class="list-disc pl-6 mt-4 space-y-2">
      <li>Hasta takip sistemleri</li>
      <li>Oda durumu monitörleri</li>
      <li>Radyoloji istek ve raporlama sistemleri</li>
      <li>Ameliyathane planlama sistemleri</li>
      <li>Fatura ve muayene entegrasyonları</li>
    </ul>
  `;
  
  apiIntegrations = [
    {
      name: 'MHRS Entegrasyonu',
      description: 'Merkezi Hekim Randevu Sistemi ile entegrasyon'
    },
    {
      name: 'E-Nabız Entegrasyonu',
      description: 'Ulusal elektronik sağlık kayıt sistemine bağlanma'
    },
    {
      name: 'Medula Entegrasyonu',
      description: 'Sosyal Güvenlik Kurumu faturalama sistemi'
    }
  ];
  
  agentJobs = [
    {
      name: 'Veri Senkronizasyonu',
      description: 'Farklı sistemler arasında veri aktarımı'
    },
    {
      name: 'Rapor Oluşturma',
      description: 'Otomatik rapor oluşturma ve dağıtımı'
    },
    {
      name: 'Bildirim Sistemleri',
      description: 'SMS ve e-posta bildirimleri'
    }
  ];
  
  dashboardProjects = [
    {
      name: 'Hastane Yönetim Paneli',
      description: 'Hastane personeli için merkezi yönetim paneli'
    },
    {
      name: 'Doktor Performans Gösterge Tablosu',
      description: 'Doktorların performans metriklerinin görselleştirilmesi'
    },
    {
      name: 'Hasta Memnuniyeti İzleme',
      description: 'Hasta memnuniyeti metriklerinin takibi'
    }
  ];

  aboutPageContent: AboutPageContent = {
    title: 'Hakkımda',
    developerBackground: '',
    healthcareExperience: '',
    apiIntegrations: [],
    agentJobs: [],
    dashboardProjects: [],
    imageUrl: ''
  };

  constructor(
    private animationService: AnimationService,
    private seoService: SeoService,
    private contentService: ContentManagementService
  ) {}
  
  ngOnInit() {
    // Set SEO metadata
    this.seoService.updateMetaTags(
      'Hakkımda - Yazılım Geliştirici Portföyü',
      '5 yıllık yazılım geliştirme deneyimim ve sağlık sektöründe çalıştığım projeler hakkında bilgiler.',
      'yazılım geliştirici, C#, .NET, Angular, sağlık sistemleri, deneyim',
      'assets/images/about-preview.jpg'
    );
    
    // Load content from service
    this.contentService.getAboutPageContent().subscribe(content => {
      this.aboutPageContent = {...content};
    });
    
    // Initialize animations after view loads
    setTimeout(() => {
      this.animationService.initScrollAnimations();
      this.animationService.initHoverEffects();
    }, 100);
  }
}