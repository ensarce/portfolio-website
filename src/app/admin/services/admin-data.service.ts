import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Project, Skill, SkillCategory } from '../../services/portfolio-data.service';
import { FirebaseService } from '../../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  // Projects data
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  
  // Skills data
  private skillsSubject = new BehaviorSubject<SkillCategory[]>([]);

  private isBrowser: boolean;

  constructor(
    private firebaseService: FirebaseService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Load data from Firebase if available
    if (this.isBrowser) {
      this.loadProjectsFromFirebase();
      this.loadSkillsFromFirebase();
    }
  }
  
  private async loadProjectsFromFirebase(): Promise<void> {
    try {
      const projects = await this.firebaseService.getProjects();
      if (projects && projects.length > 0) {
        this.projectsSubject.next(projects);
      } else {
        // Load from localStorage as fallback
        this.loadProjectsFromStorage();
      }
    } catch (error) {
      console.warn('Failed to load projects from Firebase');
      this.loadProjectsFromStorage();
    }
  }
  
  private async loadSkillsFromFirebase(): Promise<void> {
    try {
      const skills = await this.firebaseService.getSkills();
      if (skills && skills.length > 0) {
        this.skillsSubject.next(skills);
      } else {
        // Load from localStorage as fallback
        this.loadSkillsFromStorage();
      }
    } catch (error) {
      console.warn('Failed to load skills from Firebase');
      this.loadSkillsFromStorage();
    }
  }
  
  private loadProjectsFromStorage(): void {
    if (this.isBrowser) {
      const storedProjects = localStorage.getItem('adminProjects');
      if (storedProjects) {
        try {
          this.projectsSubject.next(JSON.parse(storedProjects));
        } catch (e) {
          console.warn('Failed to parse admin projects data');
        }
      }
    }
  }
  
  private loadSkillsFromStorage(): void {
    if (this.isBrowser) {
      const storedSkills = localStorage.getItem('adminSkills');
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

  async addProject(project: Project): Promise<void> {
    const currentProjects = this.projectsSubject.getValue();
    const newProjects = [...currentProjects, project];
    this.projectsSubject.next(newProjects);
    
    if (this.isBrowser) {
      try {
        await this.firebaseService.addProject(project);
        localStorage.setItem('adminProjects', JSON.stringify(newProjects));
      } catch (error) {
        console.error('Failed to add project to Firebase:', error);
        // Fallback to localStorage
        localStorage.setItem('adminProjects', JSON.stringify(newProjects));
      }
    }
  }

  async updateProject(updatedProject: Project): Promise<void> {
    const currentProjects = this.projectsSubject.getValue();
    const index = currentProjects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      const newProjects = [...currentProjects];
      newProjects[index] = updatedProject;
      this.projectsSubject.next(newProjects);
      
      if (this.isBrowser) {
        try {
          await this.firebaseService.updateProject(updatedProject);
          localStorage.setItem('adminProjects', JSON.stringify(newProjects));
        } catch (error) {
          console.error('Failed to update project in Firebase:', error);
          // Fallback to localStorage
          localStorage.setItem('adminProjects', JSON.stringify(newProjects));
        }
      }
    }
  }

  async deleteProject(id: number): Promise<void> {
    const currentProjects = this.projectsSubject.getValue();
    const newProjects = currentProjects.filter(p => p.id !== id);
    this.projectsSubject.next(newProjects);
    
    if (this.isBrowser) {
      try {
        await this.firebaseService.deleteProject(id.toString());
        localStorage.setItem('adminProjects', JSON.stringify(newProjects));
      } catch (error) {
        console.error('Failed to delete project from Firebase:', error);
        // Fallback to localStorage
        localStorage.setItem('adminProjects', JSON.stringify(newProjects));
      }
    }
  }

  // Skills methods
  getSkills(): Observable<SkillCategory[]> {
    return this.skillsSubject.asObservable();
  }

  async updateSkills(skills: SkillCategory[]): Promise<void> {
    this.skillsSubject.next(skills);
    
    if (this.isBrowser) {
      try {
        await this.firebaseService.updateSkills(skills);
        localStorage.setItem('adminSkills', JSON.stringify(skills));
      } catch (error) {
        console.error('Failed to update skills in Firebase:', error);
        // Fallback to localStorage
        localStorage.setItem('adminSkills', JSON.stringify(skills));
      }
    }
  }

  async addSkillCategory(category: SkillCategory): Promise<void> {
    const currentSkills = this.skillsSubject.getValue();
    const newSkills = [...currentSkills, category];
    this.skillsSubject.next(newSkills);
    
    if (this.isBrowser) {
      try {
        // We need to convert the skills array to the format expected by Firebase
        const updatedSkills = [...currentSkills, category];
        await this.firebaseService.updateSkills(updatedSkills);
        localStorage.setItem('adminSkills', JSON.stringify(newSkills));
      } catch (error) {
        console.error('Failed to add skill category to Firebase:', error);
        // Fallback to localStorage
        localStorage.setItem('adminSkills', JSON.stringify(newSkills));
      }
    }
  }

  async deleteSkillCategory(categoryName: string): Promise<void> {
    const currentSkills = this.skillsSubject.getValue();
    const newSkills = currentSkills.filter(s => s.category !== categoryName);
    this.skillsSubject.next(newSkills);
    
    if (this.isBrowser) {
      try {
        await this.firebaseService.updateSkills(newSkills);
        localStorage.setItem('adminSkills', JSON.stringify(newSkills));
      } catch (error) {
        console.error('Failed to delete skill category from Firebase:', error);
        // Fallback to localStorage
        localStorage.setItem('adminSkills', JSON.stringify(newSkills));
      }
    }
  }
}