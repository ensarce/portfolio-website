import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminDataService } from '../../services/admin-data.service';
import { Project } from '../../../services/portfolio-data.service';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class AdminProjectsComponent implements OnInit {
  projects: Project[] = [];
  editingProject: Project | null = null;
  isNewProject = false;


  // Form fields
  projectForm: Project = {
    id: 0,
    title: '',
    description: '',
    technologies: [],
    image: '',
    liveDemo: '',
    github: '',
    category: ''
  };

  technologyInput = '';

  constructor(
    private authService: AdminAuthService,
    private dataService: AdminDataService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/login']);
      return;
    }

    // Load projects
    this.dataService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  editProject(project: Project): void {
    // Create a deep copy to avoid reference issues
    this.editingProject = JSON.parse(JSON.stringify(project));
    this.projectForm = JSON.parse(JSON.stringify(project));
    this.isNewProject = false;
  }

  addProject(): void {
    const newId = this.projects.length > 0 ? Math.max(...this.projects.map((p: Project) => p.id)) + 1 : 1;
    this.editingProject = {
      id: newId,
      title: '',
      description: '',
      technologies: [],
      image: '',
      liveDemo: '',
      github: '',
      category: ''
    };
    this.projectForm = {...this.editingProject};
    this.isNewProject = true;
  }

  cancelEdit(): void {
    this.editingProject = null;
  }

  saveProject(): void {
    if (this.isNewProject) {
      this.dataService.addProject(this.projectForm);
    } else {
      this.dataService.updateProject(this.projectForm);
    }
    this.editingProject = null;
  }

  deleteProject(id: number): void {
    if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      this.dataService.deleteProject(id);
    }
  }

  addTechnology(): void {
    if (this.technologyInput.trim() && !this.projectForm.technologies.includes(this.technologyInput.trim())) {
      this.projectForm.technologies.push(this.technologyInput.trim());
      this.technologyInput = '';
    }
  }

  removeTechnology(index: number): void {
    this.projectForm.technologies.splice(index, 1);
  }
}