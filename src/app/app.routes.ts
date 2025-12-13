import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminLoginComponent } from './admin/components/login/login.component';
import { AdminDashboardComponent } from './admin/components/dashboard/dashboard.component';
import { AdminProjectsComponent } from './admin/components/projects/projects.component';
import { AdminSkillsComponent } from './admin/components/skills/skills.component';
import { ContentManagementComponent } from './admin/components/content-management/content-management.component';
import { AdminAuthGuard } from './admin/services/admin-auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  
  // Admin routes
  { path: 'admin/login', component: AdminLoginComponent },
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard]
  },
  { 
    path: 'admin/projects', 
    component: AdminProjectsComponent,
    canActivate: [AdminAuthGuard]
  },
  { 
    path: 'admin/skills', 
    component: AdminSkillsComponent,
    canActivate: [AdminAuthGuard]
  },
  { 
    path: 'admin/content', 
    component: ContentManagementComponent,
    canActivate: [AdminAuthGuard]
  },
  
  { path: '**', redirectTo: '' }
];