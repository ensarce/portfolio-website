import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminDataService } from '../../services/admin-data.service';
import { Project, SkillCategory } from '../../../services/portfolio-data.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  projectCount: number = 0;
  skillCategoryCount: number = 0;

  constructor(
    private authService: AdminAuthService,
    private adminDataService: AdminDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/login']);
    }

    // Load project and skill counts
    this.adminDataService.getProjects().subscribe(projects => {
      this.projectCount = projects.length;
    });

    this.adminDataService.getSkills().subscribe(skills => {
      this.skillCategoryCount = skills.length;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}