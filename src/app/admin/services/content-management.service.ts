import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface HomePageContent {
  heroTitle: string;
  heroSubtitle: string;
  shortBio: string;
}

export interface AboutPageContent {
  title: string;
  developerBackground: string;
  healthcareExperience: string;
  apiIntegrations: ApiIntegration[];
  agentJobs: AgentJob[];
  dashboardProjects: DashboardProject[];
  imageUrl: string;
}

export interface ApiIntegration {
  name: string;
  description: string;
}

export interface AgentJob {
  name: string;
  description: string;
}

export interface DashboardProject {
  name: string;
  description: string;
}

export interface ContactPageContent {
  title: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentManagementService {
  private isBrowser: boolean;
  
  // Default content
  private defaultHomePageContent: HomePageContent = {
    heroTitle: 'Merhaba, Ben Bir Yazılım Geliştiricisiyim',
    heroSubtitle: 'C#, .NET, Angular ve Sağlık Sistemleri alanında uzmanlaşmış bir geliştirici olarak, kullanıcı odaklı çözümler üretiyorum.',
    shortBio: 'Yaklaşık 5 yıldır yazılım geliştirme alanında çalışan bir profesyonel olarak, özellikle sağlık sektöründe entegre sistemler üzerine yoğunlaştım. Geliştirdiğim çözümlerle hastanelerde verimliliği artırmayı ve hasta deneyimini iyileştirmeyi hedefliyorum.'
  };
  
  private defaultAboutPageContent: AboutPageContent = {
    title: 'Hakkımda',
    developerBackground: `
    <p>Yazılım geliştirmesine 5 yıl önce başladım ve o zamandan beri sürekli öğrenmeye ve kendimi geliştirmeye devam ediyorum. 
    Başlangıçta C# ve .NET teknolojileriyle masaüstü uygulamalar geliştirerek kariyerime başladım.</p>
    
    <p>Zamanla web teknolojilerine yönelerek Angular ile frontend geliştirme konusunda da uzmanlaştım. 
    Özellikle sağlık sektöründe çalışmak beni çok ilgilendiriyor çünkü bu alanda geliştirdiğim çözümler 
    doğrudan insan hayatına dokunuyor ve fark yaratıyor.</p>
  `,
    healthcareExperience: `
    <p>Sağlık sektöründe 3 yıldır aktif olarak çalışıyorum ve bu süreçte hastanelerde kullanılan çeşitli sistemlerin 
    entegrasyonu ve iyileştirilmesi üzerine projelerde yer aldım. Bu projeler arasında:</p>
    
    <ul class="list-disc pl-6 mt-4 space-y-2">
      <li>Hasta takip sistemleri</li>
      <li>Oda durumu monitörleri</li>
      <li>Radyoloji istek ve raporlama sistemleri</li>
      <li>Ameliyathane planlama sistemleri</li>
      <li>Fatura ve muayene entegrasyonları</li>
    </ul>
  `,
    apiIntegrations: [
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
    ],
    agentJobs: [
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
    ],
    dashboardProjects: [
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
    ],
    imageUrl: 'assets/images/profile.jpg'
  };
  
  private defaultContactPageContent: ContactPageContent = {
    title: 'İletişim',
    email: 'email@example.com',
    phone: '+90 555 555 55 55',
    address: 'İstanbul, Türkiye',
    socialLinks: [
      { name: 'LinkedIn', url: '#', icon: 'fab fa-linkedin' },
      { name: 'GitHub', url: '#', icon: 'fab fa-github' },
      { name: 'Twitter', url: '#', icon: 'fab fa-twitter' }
    ]
  };
  
  // BehaviorSubjects for reactive content updates
  private homePageContentSubject = new BehaviorSubject<HomePageContent>(this.defaultHomePageContent);
  private aboutPageContentSubject = new BehaviorSubject<AboutPageContent>(this.defaultAboutPageContent);
  private contactPageContentSubject = new BehaviorSubject<ContactPageContent>(this.defaultContactPageContent);
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Load content from localStorage if available
    if (this.isBrowser) {
      this.loadContentFromStorage();
    }
  }
  
  private loadContentFromStorage(): void {
    try {
      const storedHomePageContent = localStorage.getItem('homePageContent');
      const storedAboutPageContent = localStorage.getItem('aboutPageContent');
      const storedContactPageContent = localStorage.getItem('contactPageContent');
      
      if (storedHomePageContent) {
        this.homePageContentSubject.next(JSON.parse(storedHomePageContent));
      }
      
      if (storedAboutPageContent) {
        this.aboutPageContentSubject.next(JSON.parse(storedAboutPageContent));
      }
      
      if (storedContactPageContent) {
        this.contactPageContentSubject.next(JSON.parse(storedContactPageContent));
      }
    } catch (e) {
      console.warn('Failed to load content from localStorage');
    }
  }
  
  // Home page content methods
  getHomePageContent(): Observable<HomePageContent> {
    return this.homePageContentSubject.asObservable();
  }
  
  updateHomePageContent(content: HomePageContent): void {
    this.homePageContentSubject.next(content);
    if (this.isBrowser) {
      localStorage.setItem('homePageContent', JSON.stringify(content));
    }
  }
  
  // About page content methods
  getAboutPageContent(): Observable<AboutPageContent> {
    return this.aboutPageContentSubject.asObservable();
  }
  
  updateAboutPageContent(content: AboutPageContent): void {
    this.aboutPageContentSubject.next(content);
    if (this.isBrowser) {
      localStorage.setItem('aboutPageContent', JSON.stringify(content));
    }
  }
  
  // Contact page content methods
  getContactPageContent(): Observable<ContactPageContent> {
    return this.contactPageContentSubject.asObservable();
  }
  
  updateContactPageContent(content: ContactPageContent): void {
    this.contactPageContentSubject.next(content);
    if (this.isBrowser) {
      localStorage.setItem('contactPageContent', JSON.stringify(content));
    }
  }
  
  // Reset to default content
  resetToDefault(): void {
    this.updateHomePageContent(this.defaultHomePageContent);
    this.updateAboutPageContent(this.defaultAboutPageContent);
    this.updateContactPageContent(this.defaultContactPageContent);
  }
}