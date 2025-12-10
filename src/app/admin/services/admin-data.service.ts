import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Project, Skill, SkillCategory } from '../../services/portfolio-data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  // Projects data
  private projectsSubject = new BehaviorSubject<Project[]>([
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
  ]);

  // Skills data
  private skillsSubject = new BehaviorSubject<SkillCategory[]>([
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
  ]);

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Load data from localStorage if available
    if (this.isBrowser) {
      const storedProjects = localStorage.getItem('adminProjects');
      const storedSkills = localStorage.getItem('adminSkills');
      
      if (storedProjects) {
        try {
          this.projectsSubject.next(JSON.parse(storedProjects));
        } catch (e) {
          console.warn('Failed to parse admin projects data');
        }
      }
      
      if (storedSkills) {
        try {
          this.skillsSubject.next(JSON.parse(storedSkills));
        } catch (e) {
          console.warn('Failed to parse admin skills data');
        }
      }
    }
  }

  // Projects methods
  getProjects(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  addProject(project: Project): void {
    const currentProjects = this.projectsSubject.getValue();
    const newProjects = [...currentProjects, project];
    this.projectsSubject.next(newProjects);
    if (this.isBrowser) {
      localStorage.setItem('adminProjects', JSON.stringify(newProjects));
    }
  }

  updateProject(updatedProject: Project): void {
    const currentProjects = this.projectsSubject.getValue();
    const index = currentProjects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      const newProjects = [...currentProjects];
      newProjects[index] = updatedProject;
      this.projectsSubject.next(newProjects);
      if (this.isBrowser) {
        localStorage.setItem('adminProjects', JSON.stringify(newProjects));
      }
    }
  }

  deleteProject(id: number): void {
    const currentProjects = this.projectsSubject.getValue();
    const newProjects = currentProjects.filter(p => p.id !== id);
    this.projectsSubject.next(newProjects);
    if (this.isBrowser) {
      localStorage.setItem('adminProjects', JSON.stringify(newProjects));
    }
  }

  // Skills methods
  getSkills(): Observable<SkillCategory[]> {
    return this.skillsSubject.asObservable();
  }

  updateSkills(skills: SkillCategory[]): void {
    this.skillsSubject.next(skills);
    if (this.isBrowser) {
      localStorage.setItem('adminSkills', JSON.stringify(skills));
    }
  }

  addSkillCategory(category: SkillCategory): void {
    const currentSkills = this.skillsSubject.getValue();
    const newSkills = [...currentSkills, category];
    this.skillsSubject.next(newSkills);
    if (this.isBrowser) {
      localStorage.setItem('adminSkills', JSON.stringify(newSkills));
    }
  }

  deleteSkillCategory(categoryName: string): void {
    const currentSkills = this.skillsSubject.getValue();
    const newSkills = currentSkills.filter(s => s.category !== categoryName);
    this.skillsSubject.next(newSkills);
    if (this.isBrowser) {
      localStorage.setItem('adminSkills', JSON.stringify(newSkills));
    }
  }
}