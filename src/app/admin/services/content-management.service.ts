import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';

export interface HomePageContent {
  heroTitle: string;
  heroSubtitle: string;
  shortBio: string;
}

export interface AboutPageContent {
  title: string;
  content: string;
  imageUrl: string;
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
    content: 'Detaylı bilgilerimi burada bulabilirsiniz...',
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
  
  constructor(
    private firebaseService: FirebaseService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Load content from Firebase if available
    if (this.isBrowser) {
      this.loadContentFromFirebase();
    }
  }
  
  private async loadContentFromFirebase(): Promise<void> {
    try {
      // Load home page content
      const homeContent = await this.firebaseService.getHomePageContent();
      if (homeContent) {
        this.homePageContentSubject.next(homeContent);
      }
      
      // Load about page content
      const aboutContent = await this.firebaseService.getAboutPageContent();
      if (aboutContent) {
        this.aboutPageContentSubject.next(aboutContent);
      }
      
      // Load contact page content
      const contactContent = await this.firebaseService.getContactPageContent();
      if (contactContent) {
        this.contactPageContentSubject.next(contactContent);
      }
    } catch (e) {
      console.warn('Failed to load content from Firebase, using default content');
      // Load from localStorage as fallback
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
  
  async updateHomePageContent(content: HomePageContent): Promise<void> {
    this.homePageContentSubject.next(content);
    if (this.isBrowser) {
      try {
        await this.firebaseService.updateHomePageContent(content);
        localStorage.setItem('homePageContent', JSON.stringify(content));
      } catch (error) {
        console.error('Failed to update home page content in Firebase:', error);
        // Fallback to localStorage
        localStorage.setItem('homePageContent', JSON.stringify(content));
      }
    }
  }
  
  // About page content methods
  getAboutPageContent(): Observable<AboutPageContent> {
    return this.aboutPageContentSubject.asObservable();
  }
  
  async updateAboutPageContent(content: AboutPageContent): Promise<void> {
    this.aboutPageContentSubject.next(content);
    if (this.isBrowser) {
      try {
        await this.firebaseService.updateAboutPageContent(content);
        localStorage.setItem('aboutPageContent', JSON.stringify(content));
      } catch (error) {
        console.error('Failed to update about page content in Firebase:', error);
        // Fallback to localStorage
        localStorage.setItem('aboutPageContent', JSON.stringify(content));
      }
    }
  }
  
  // Contact page content methods
  getContactPageContent(): Observable<ContactPageContent> {
    return this.contactPageContentSubject.asObservable();
  }
  
  async updateContactPageContent(content: ContactPageContent): Promise<void> {
    this.contactPageContentSubject.next(content);
    if (this.isBrowser) {
      try {
        await this.firebaseService.updateContactPageContent(content);
        localStorage.setItem('contactPageContent', JSON.stringify(content));
      } catch (error) {
        console.error('Failed to update contact page content in Firebase:', error);
        // Fallback to localStorage
        localStorage.setItem('contactPageContent', JSON.stringify(content));
      }
    }
  }
  
  // Reset to default content
  async resetToDefault(): Promise<void> {
    await this.updateHomePageContent(this.defaultHomePageContent);
    await this.updateAboutPageContent(this.defaultAboutPageContent);
    await this.updateContactPageContent(this.defaultContactPageContent);
  }
}