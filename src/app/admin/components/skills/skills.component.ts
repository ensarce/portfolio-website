import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminDataService } from '../../services/admin-data.service';
import { Skill, SkillCategory } from '../../../services/portfolio-data.service';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class AdminSkillsComponent implements OnInit {
  skillCategories: SkillCategory[] = [];
  editingCategory: SkillCategory | null = null;
  isNewCategory = false;
  isEditingSkill = false;
  editingSkillIndex: number | null = null;

  // Form fields
  categoryForm = {
    category: '',
    items: [] as Skill[]
  };

  skillForm = {
    name: '',
    level: 0
  };

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

    // Load skills and subscribe to updates
    this.dataService.getSkills().subscribe(skills => {
      this.skillCategories = skills;
      // If we're currently editing a category, update it with the latest data
      if (this.editingCategory && !this.isNewCategory) {
        const updatedCategory = skills.find(cat => cat.category === this.editingCategory!.category);
        if (updatedCategory) {
          this.editingCategory = JSON.parse(JSON.stringify(updatedCategory));
          this.categoryForm = JSON.parse(JSON.stringify(updatedCategory));
        }
      }
    });
  }

  editCategory(category: SkillCategory): void {
    // Create a deep copy to avoid reference issues
    this.editingCategory = JSON.parse(JSON.stringify(category));
    this.categoryForm = JSON.parse(JSON.stringify(category));
    this.isNewCategory = false;
  }

  addCategory(): void {
    this.editingCategory = {
      category: '',
      items: []
    };
    this.categoryForm = {...this.editingCategory};
    this.isNewCategory = true;
  }

  cancelEdit(): void {
    this.editingCategory = null;
    this.isEditingSkill = false;
    this.editingSkillIndex = null;
  }

  async saveCategory(): Promise<void> {
    if (this.isNewCategory) {
      await this.dataService.addSkillCategory(this.categoryForm);
      // Update local array to reflect the new category
      this.skillCategories = [...this.skillCategories, this.categoryForm];
    } else {
      // Update the category in the local array
      this.skillCategories = this.skillCategories.map(cat => 
        cat.category === this.categoryForm.category ? this.categoryForm : cat
      );
      // Save all categories to the data service
      await this.dataService.updateSkills(this.skillCategories);
    }
    this.editingCategory = null;
  }

  async deleteCategory(categoryName: string): Promise<void> {
    if (confirm(`${categoryName} kategorisini silmek istediğinizden emin misiniz?`)) {
      await this.dataService.deleteSkillCategory(categoryName);
      // Update local array to reflect the deletion
      this.skillCategories = this.skillCategories.filter(cat => cat.category !== categoryName);
    }
  }

  editSkill(index: number): void {
    if (this.editingCategory) {
      this.skillForm = {...this.editingCategory.items[index]};
      this.isEditingSkill = true;
      this.editingSkillIndex = index;
    }
  }

  addSkill(): void {
    if (this.editingCategory) {
      this.editingCategory.items.push({...this.skillForm});
      this.resetSkillForm();
    }
  }

  updateSkill(): void {
    if (this.editingCategory && this.editingSkillIndex !== null) {
      this.editingCategory.items[this.editingSkillIndex] = {...this.skillForm};
      this.isEditingSkill = false;
      this.editingSkillIndex = null;
      this.resetSkillForm();
    }
  }

  async deleteSkill(index: number): Promise<void> {
    if (this.editingCategory) {
      if (confirm('Bu yeteneği silmek istediğinizden emin misiniz?')) {
        this.editingCategory.items.splice(index, 1);
      }
    }
  }

  resetSkillForm(): void {
    this.skillForm = {
      name: '',
      level: 0
    };
  }

  cancelSkillEdit(): void {
    this.isEditingSkill = false;
    this.editingSkillIndex = null;
    this.resetSkillForm();
  }
}