import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveDemo: string;
  github: string;
  category: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface PortfolioData {
  projects: Project[];
  skills: SkillCategory[];
}

// Mock data for SSR
const mockData: PortfolioData = {
  projects: [
    {
      id: 1,
      title: 'Hasta Bileklik Takip Sistemi',
      description: 'Hastanelerde hasta konumunu gerçek zamanlı takip eden IoT tabanlı bir sistem. RFID teknolojisi kullanılarak geliştirildi.',
      technologies: ['C#', '.NET', 'Angular', 'SQL', 'IoT'],
      image: 'assets/images/patient-tracking.jpg',
      liveDemo: '#',
      github: '#',
      category: 'Healthcare'
    },
    {
      id: 2,
      title: 'Oda Durum Takip Ekranı',
      description: 'Hastane odalarının doluluk durumunu gösteren dijital ekran sistemi. Hastane personelinin odaları daha etkin yönetmesini sağlar.',
      technologies: ['Angular', 'REST API', 'DevExpress', 'WebSocket'],
      image: 'assets/images/room-status.jpg',
      liveDemo: '#',
      github: '#',
      category: 'Healthcare'
    },
    {
      id: 3,
      title: 'Radyoloji İstek Sistemi',
      description: 'Radyoloji departmanı için entegre istek ve raporlama sistemi. Doktorlar tarafından talep edilen radyolojik incelemelerin takibi sağlanır.',
      technologies: ['C#', '.NET', 'SQL', 'Agent Jobs', 'REST API'],
      image: 'assets/images/radiology-system.jpg',
      liveDemo: '#',
      github: '#',
      category: 'Healthcare'
    },
    {
      id: 4,
      title: 'QR Menü Uygulaması',
      description: 'Restoranlar için temasız menü çözümü. QR kod ile erişilebilen dijital menü sistemi.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'QR Code'],
      image: 'assets/images/qr-menu.jpg',
      liveDemo: '#',
      github: '#',
      category: 'Web Application'
    },
    {
      id: 5,
      title: 'WordPress Envanter Yönetimi',
      description: 'Küçük işletmeler için envanter takip sistemi. WordPress üzerine kurulan özel bir eklenti.',
      technologies: ['WordPress', 'PHP', 'MySQL', 'JavaScript'],
      image: 'assets/images/inventory-wordpress.jpg',
      liveDemo: '#',
      github: '#',
      category: 'CMS Integration'
    }
  ],
  skills: [
    {
      category: 'Backend',
      items: [
        { name: 'C#', level: 90 },
        { name: '.NET Core', level: 85 },
        { name: 'ASP.NET MVC', level: 80 },
        { name: 'Entity Framework', level: 85 },
        { name: 'SQL Server', level: 80 },
        { name: 'REST API', level: 90 }
      ]
    },
    {
      category: 'Frontend',
      items: [
        { name: 'Angular', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'HTML5/CSS3', level: 90 },
        { name: 'SCSS', level: 85 },
        { name: 'RxJS', level: 75 },
        { name: 'DevExpress', level: 70 }
      ]
    },
    {
      category: 'Tools & Platforms',
      items: [
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'Azure', level: 75 },
        { name: 'WordPress', level: 70 },
        { name: 'Agent Jobs', level: 80 },
        { name: 'Automation Systems', level: 85 }
      ]
    }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private jsonDataUrl = environment.portfolioDataUrl;
  
  constructor(
    private http: HttpClient,
    private firebaseService: FirebaseService
  ) { }

  async getProjects(): Promise<Observable<Project[]>> {
    if (typeof window === 'undefined') {
      // Server-side rendering - return mock data
      return of(mockData.projects);
    }
    
    try {
      // Try to get projects from Firebase
      const projects = await this.firebaseService.getProjects();
      if (projects && projects.length > 0) {
        return of(projects);
      }
    } catch (error) {
      console.warn('Failed to load projects from Firebase, checking localStorage');
    }
    
    // Check if admin data exists in localStorage
    const storedProjects = localStorage.getItem('adminProjects');
    if (storedProjects) {
      try {
        return of(JSON.parse(storedProjects));
      } catch (e) {
        console.warn('Failed to parse admin projects data, using default data');
      }
    }
    
    return this.http.get<PortfolioData>(this.jsonDataUrl).pipe(
      map(data => data.projects),
      catchError(this.handleError)
    );
  }

  async getProjectsByCategory(category: string): Promise<Observable<Project[]>> {
    if (typeof window === 'undefined') {
      // Server-side rendering - return mock data
      if (category === 'All') {
        return of(mockData.projects);
      }
      return of(mockData.projects.filter(project => project.category === category));
    }
    
    let projects: Project[] = [];
    
    try {
      // Try to get projects from Firebase
      projects = await this.firebaseService.getProjects();
    } catch (error) {
      console.warn('Failed to load projects from Firebase');
      
      // Check if admin data exists in localStorage
      const storedProjects = localStorage.getItem('adminProjects');
      if (storedProjects) {
        try {
          projects = JSON.parse(storedProjects);
        } catch (e) {
          console.warn('Failed to parse admin projects data, using default data');
          projects = mockData.projects;
        }
      } else {
        projects = mockData.projects;
      }
    }
    
    if (category === 'All') {
      return of(projects);
    }
    return of(projects.filter(project => project.category === category));
  }

  async getSkills(): Promise<Observable<SkillCategory[]>> {
    if (typeof window === 'undefined') {
      // Server-side rendering - return mock data
      return of(mockData.skills);
    }
    
    try {
      // Try to get skills from Firebase
      const skills = await this.firebaseService.getSkills();
      if (skills && skills.length > 0) {
        return of(skills);
      }
    } catch (error) {
      console.warn('Failed to load skills from Firebase, checking localStorage');
    }
    
    // Check if admin data exists in localStorage
    const storedSkills = localStorage.getItem('adminSkills');
    if (storedSkills) {
      try {
        return of(JSON.parse(storedSkills));
      } catch (e) {
        console.warn('Failed to parse admin skills data, using default data');
      }
    }
    
    return this.http.get<PortfolioData>(this.jsonDataUrl).pipe(
      map(data => data.skills),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}