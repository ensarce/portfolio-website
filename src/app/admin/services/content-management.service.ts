import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

// Theme interface
export interface ThemeSettings {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  darkMode: boolean;
}

// Site settings interface
export interface SiteSettings {
  theme: ThemeSettings;
  footerText: string;
}

// Hero section interface
export interface HeroSection {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

// About section interface
export interface AboutSection {
  content: string;
  isActive: boolean;
}

// Skill interface
export interface Skill {
  name: string;
  level: number;
  category: string;
  order: number;
  isActive: boolean;
}

// Skills section interface
export interface SkillsSection {
  isActive: boolean;
  skills: Skill[];
}

// Project interface
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  order: number;
  isActive: boolean;
}

// Projects section interface
export interface ProjectsSection {
  isActive: boolean;
  projects: Project[];
}

// Contact section interface
export interface ContactSection {
  isActive: boolean;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
}

// Main content interface
export interface PortfolioContent {
  siteSettings: SiteSettings;
  heroSection: HeroSection;
  aboutSection: AboutSection;
  skillsSection: SkillsSection;
  projectsSection: ProjectsSection;
  contactSection: ContactSection;
}

@Injectable({
  providedIn: 'root'
})
export class ContentManagementService {
  private isBrowser: boolean;
  
  // Default content based on the provided JSON
  private defaultContent: PortfolioContent = {
    siteSettings: {
      theme: {
        primaryColor: "#3B82F6",
        backgroundColor: "#0F172A",
        textColor: "#E5E7EB",
        darkMode: true
      },
      footerText: "© 2025 Ensar CE | Software Developer"
    },
    heroSection: {
      title: "Merhaba, Ben Ensar",
      subtitle: "C#, .NET ve Angular ile özellikle sağlık sistemleri alanında kurumsal yazılımlar geliştiriyorum.",
      ctaText: "Projelerimi Gör",
      ctaLink: "#/projects",
      isActive: true
    },
    aboutSection: {
      content: "C# ve .NET başta olmak üzere Angular, REST API ve SQL teknolojileriyle kurumsal yazılımlar geliştiriyorum. Özellikle hastane bilgi yönetim sistemleri (HBYS), hasta takip ekranları, agent job’lar ve veri entegrasyonları üzerine yoğun tecrübem var. Gerçek zamanlı veri işleme, dashboard geliştirme ve yönetilebilir sistemler oluşturma konularında çalışıyorum.",
      isActive: true
    },
    skillsSection: {
      isActive: true,
      skills: [
        {
          name: "C#",
          level: 90,
          category: "Backend",
          order: 1,
          isActive: true
        },
        {
          name: ".NET",
          level: 85,
          category: "Backend",
          order: 2,
          isActive: true
        },
        {
          name: "SQL",
          level: 80,
          category: "Backend",
          order: 3,
          isActive: true
        },
        {
          name: "Angular",
          level: 80,
          category: "Frontend",
          order: 4,
          isActive: true
        },
        {
          name: "DevExpress",
          level: 75,
          category: "Tools",
          order: 5,
          isActive: true
        },
        {
          name: "REST API",
          level: 85,
          category: "Backend",
          order: 6,
          isActive: true
        },
        {
          name: "WordPress",
          level: 65,
          category: "Tools",
          order: 7,
          isActive: true
        }
      ]
    },
    projectsSection: {
      isActive: true,
      projects: [
        {
          title: "Hasta Bileklik Takip Sistemi",
          description: "Hastaya takılı bilekliklerin aktif zaman aralıklarını takip eden, agent job ile periyodik API çağrıları yapan ve konum verilerini veritabanına kaydeden sistem.",
          technologies: ["C#", ".NET", "REST API", "SQL"],
          order: 1,
          isActive: true
        },
        {
          title: "Oda Durum ve Hasta Hareket Takip Ekranı",
          description: "Hastane içinde hasta hareketlerini izleyen, anlık güncellenen ve kritik geçişleri vurgulayan WinForms tabanlı ekran.",
          technologies: ["C#", "WinForms", "DevExpress", "SQL"],
          order: 2,
          isActive: true
        },
        {
          title: "Radyoloji İstek ve Açıklama Yönetimi",
          description: "Doktor istemleri sırasında klinik açıklamaların yönetildiği, servis katmanı üzerinden kayıt alınan HBYS modülü.",
          technologies: ["C#", ".NET", "SQL"],
          order: 3,
          isActive: true
        },
        {
          title: "QR Menü Uygulaması",
          description: "Restoranlar için geliştirilen, mobil uyumlu ve yönetilebilir QR menü uygulaması.",
          technologies: ["Angular", "Bootstrap"],
          order: 4,
          isActive: true
        }
      ]
    },
    contactSection: {
      isActive: true,
      email: "ensar@example.com",
      github: "https://github.com/ensarce",
      linkedin: "",
      whatsapp: ""
    }
  };
  
  // BehaviorSubject for reactive content updates
  private contentSubject = new BehaviorSubject<PortfolioContent>(this.defaultContent);
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Load content from localStorage if available
    if (this.isBrowser) {
      this.loadContentFromStorage();
    }
  }
  
  private loadContentFromStorage(): void {
    try {
      const storedContent = localStorage.getItem('portfolioContent');
      if (storedContent) {
        this.contentSubject.next(JSON.parse(storedContent));
      }
    } catch (e) {
      console.warn('Failed to load content from localStorage');
    }
  }
  
  // Get portfolio content as observable
  getContent(): Observable<PortfolioContent> {
    return this.contentSubject.asObservable();
  }
  
  // Update portfolio content
  updateContent(content: PortfolioContent): void {
    this.contentSubject.next(content);
    if (this.isBrowser) {
      localStorage.setItem('portfolioContent', JSON.stringify(content));
    }
  }
  
  // Reset to default content
  resetToDefault(): void {
    this.updateContent(this.defaultContent);
  }
  
  // Get individual section content
  getSiteSettings(): Observable<SiteSettings> {
    return new Observable(observer => {
      this.getContent().subscribe(content => {
        observer.next(content.siteSettings);
      });
    });
  }
  
  getHeroSection(): Observable<HeroSection> {
    return new Observable(observer => {
      this.getContent().subscribe(content => {
        observer.next(content.heroSection);
      });
    });
  }
  
  getAboutSection(): Observable<AboutSection> {
    return new Observable(observer => {
      this.getContent().subscribe(content => {
        observer.next(content.aboutSection);
      });
    });
  }
  
  getSkillsSection(): Observable<SkillsSection> {
    return new Observable(observer => {
      this.getContent().subscribe(content => {
        observer.next(content.skillsSection);
      });
    });
  }
  
  getProjectsSection(): Observable<ProjectsSection> {
    return new Observable(observer => {
      this.getContent().subscribe(content => {
        observer.next(content.projectsSection);
      });
    });
  }
  
  getContactSection(): Observable<ContactSection> {
    return new Observable(observer => {
      this.getContent().subscribe(content => {
        observer.next(content.contactSection);
      });
    });
  }
}