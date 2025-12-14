import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { 
  HeroSettings, 
  AboutSection, 
  ContactSection, 
  FooterSection, 
  ApiIntegration, 
  AgentJob, 
  DashboardProject, 
  SocialLink,
  SiteSettings,
  SkillsSection,
  ProjectsSection
} from '../models/content-models';

// Export all interfaces for use in components
export type { 
  HeroSettings, 
  AboutSection, 
  ContactSection, 
  FooterSection, 
  ApiIntegration, 
  AgentJob, 
  DashboardProject, 
  SocialLink,
  SiteSettings,
  SkillsSection,
  ProjectsSection
};

@Injectable({
  providedIn: 'root'
})
export class ContentManagementService {
  private isBrowser: boolean;
  
  // Default content with structured models
  private defaultSiteSettings: SiteSettings = {
    theme: {
      primaryColor: '#00c3ff',
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      darkMode: true
    },
    hero: {
      title: 'Merhaba, Ben Bir Yazılım Geliştiricisiyim',
      subtitle: 'C#, .NET, Angular ve Sağlık Sistemleri alanında uzmanlaşmış bir geliştirici olarak, kullanıcı odaklı çözümler üretiyorum.',
      ctaText: 'Projelerime Göz Atın',
      ctaLink: '/projects',
      isActive: true
    },
    about: {
      title: 'Hakkımda',
      developerBackgroundTitle: 'Geliştirici Geçmişim',
      developerBackground: 'Yazılım geliştirmesine 5 yıl önce başladım ve o zamandan beri sürekli öğrenmeye ve kendimi geliştirmeye devam ediyorum. Başlangıçta C# ve .NET teknolojileriyle masaüstü uygulamalar geliştirerek kariyerime başladım. Zamanla web teknolojilerine yönelerek Angular ile frontend geliştirme konusunda da uzmanlaştım. Özellikle sağlık sektöründe çalışmak beni çok ilgilendiriyor çünkü bu alanda geliştirdiğim çözümler doğrudan insan hayatına dokunuyor ve fark yaratıyor.',
      healthcareExperienceTitle: 'Sağlık Sistemleri Deneyimim',
      healthcareExperience: 'Sağlık sektöründe 3 yıldır aktif olarak çalışıyorum ve bu süreçte hastanelerde kullanılan çeşitli sistemlerin entegrasyonu ve iyileştirilmesi üzerine projelerde yer aldım. Bu projeler arasında: Hasta takip sistemleri, Oda durumu monitörleri, Radyoloji istek ve raporlama sistemleri, Ameliyathane planlama sistemleri, Fatura ve muayene entegrasyonları',
      apiIntegrationsTitle: 'API Entegrasyonları',
      apiIntegrations: [
        {
          id: 1,
          name: 'MHRS Entegrasyonu',
          description: 'Merkezi Hekim Randevu Sistemi ile entegrasyon',
          isActive: true
        },
        {
          id: 2,
          name: 'E-Nabız Entegrasyonu',
          description: 'Ulusal elektronik sağlık kayıt sistemine bağlanma',
          isActive: true
        },
        {
          id: 3,
          name: 'Medula Entegrasyonu',
          description: 'Sosyal Güvenlik Kurumu faturalama sistemi',
          isActive: true
        }
      ],
      agentJobsTitle: 'Arka Plan İşleri',
      agentJobs: [
        {
          id: 1,
          name: 'Veri Senkronizasyonu',
          description: 'Farklı sistemler arasında veri aktarımı',
          isActive: true
        },
        {
          id: 2,
          name: 'Rapor Oluşturma',
          description: 'Otomatik rapor oluşturma ve dağıtımı',
          isActive: true
        },
        {
          id: 3,
          name: 'Bildirim Sistemleri',
          description: 'SMS ve e-posta bildirimleri',
          isActive: true
        }
      ],
      dashboardProjectsTitle: 'Gösterge Tabloları',
      dashboardProjects: [
        {
          id: 1,
          name: 'Hastane Yönetim Paneli',
          description: 'Hastane personeli için merkezi yönetim paneli',
          isActive: true
        },
        {
          id: 2,
          name: 'Doktor Performans Gösterge Tablosu',
          description: 'Doktorların performans metriklerinin görselleştirilmesi',
          isActive: true
        },
        {
          id: 3,
          name: 'Hasta Memnuniyeti İzleme',
          description: 'Hasta memnuniyeti metriklerinin takibi',
          isActive: true
        }
      ],
      imageUrl: 'assets/images/profile.jpg',
      isActive: true
    },
    skills: {
      title: 'Yeteneklerim',
      certificatesTitle: 'Sertifikalarım',
      isActive: true
    },
    projects: {
      title: 'Projelerim',
      isActive: true
    },
    contact: {
      title: 'İletişim',
      contactFormTitle: 'Bana Ulaşın',
      contactInfoTitle: 'İletişim Bilgilerim',
      socialMediaTitle: 'Sosyal Medya',
      downloadCvTitle: 'CV\'mi İndirin',
      emailLabel: 'E-posta',
      phoneLabel: 'Telefon',
      addressLabel: 'Adres',
      namePlaceholder: 'Adınız',
      emailPlaceholder: 'E-posta Adresiniz',
      subjectPlaceholder: 'Konu',
      messagePlaceholder: 'Mesajınız',
      sendMessageButton: 'Mesaj Gönder',
      email: 'email@example.com',
      phone: '+90 555 555 55 55',
      address: 'İstanbul, Türkiye',
      socialLinks: [
        { 
          id: 1,
          name: 'LinkedIn', 
          url: '#', 
          icon: 'fab fa-linkedin',
          isActive: true
        },
        { 
          id: 2,
          name: 'GitHub', 
          url: '#', 
          icon: 'fab fa-github',
          isActive: true
        },
        { 
          id: 3,
          name: 'Twitter', 
          url: '#', 
          icon: 'fab fa-twitter',
          isActive: true
        }
      ],
      isActive: true
    },
    footer: {
      copyrightText: '© 2023 Tüm hakları saklıdır.',
      socialLinks: [
        { 
          id: 1,
          name: 'LinkedIn', 
          url: '#', 
          icon: 'fab fa-linkedin',
          isActive: true
        },
        { 
          id: 2,
          name: 'GitHub', 
          url: '#', 
          icon: 'fab fa-github',
          isActive: true
        },
        { 
          id: 3,
          name: 'Twitter', 
          url: '#', 
          icon: 'fab fa-twitter',
          isActive: true
        }
      ],
      isActive: true
    },
    isActive: true
  };

  // BehaviorSubjects for reactive content updates
  private siteSettingsSubject = new BehaviorSubject<SiteSettings>(this.defaultSiteSettings);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Load content from localStorage if available
    if (this.isBrowser) {
      this.loadContentFromStorage();
    }
  }
  
  private loadContentFromStorage(): void {
    try {
      const storedSiteSettings = localStorage.getItem('siteSettings');
      
      if (storedSiteSettings) {
        this.siteSettingsSubject.next(JSON.parse(storedSiteSettings));
      }
    } catch (e) {
      console.warn('Failed to load content from localStorage');
    }
  }
  
  // Site settings methods
  getSiteSettings(): Observable<SiteSettings> {
    return this.siteSettingsSubject.asObservable();
  }
  
  updateSiteSettings(settings: SiteSettings): void {
    this.siteSettingsSubject.next(settings);
    if (this.isBrowser) {
      localStorage.setItem('siteSettings', JSON.stringify(settings));
    }
  }
  
  // Reset to default content
  resetToDefault(): void {
    this.updateSiteSettings(this.defaultSiteSettings);
  }
}