import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContentManagementService, HomePageContent, AboutPageContent, ContactPageContent, SocialLink } from '../../services/content-management.service';

@Component({
  selector: 'app-content-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss']
})
export class ContentManagementComponent implements OnInit {
  homePageContent: HomePageContent = {
    heroTitle: '',
    heroSubtitle: '',
    shortBio: ''
  };

  aboutPageContent: AboutPageContent = {
    title: '',
    content: '',
    imageUrl: ''
  };

  contactPageContent: ContactPageContent = {
    title: '',
    email: '',
    phone: '',
    address: '',
    socialLinks: []
  };

  newSocialLink: SocialLink = {
    name: '',
    url: '',
    icon: ''
  };

  activeTab: string = 'home';

  constructor(private contentService: ContentManagementService) {}

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    this.contentService.getHomePageContent().subscribe(content => {
      this.homePageContent = {...content};
    });

    this.contentService.getAboutPageContent().subscribe(content => {
      this.aboutPageContent = {...content};
    });

    this.contentService.getContactPageContent().subscribe(content => {
      this.contactPageContent = {...content};
    });
  }

  async saveHomePageContent(): Promise<void> {
    await this.contentService.updateHomePageContent(this.homePageContent);
    alert('Ana sayfa içeriği başarıyla kaydedildi!');
  }

  async saveAboutPageContent(): Promise<void> {
    await this.contentService.updateAboutPageContent(this.aboutPageContent);
    alert('Hakkında sayfası içeriği başarıyla kaydedildi!');
  }

  async saveContactPageContent(): Promise<void> {
    await this.contentService.updateContactPageContent(this.contactPageContent);
    alert('İletişim sayfası içeriği başarıyla kaydedildi!');
  }

  addSocialLink(): void {
    if (this.newSocialLink.name && this.newSocialLink.url && this.newSocialLink.icon) {
      this.contactPageContent.socialLinks.push({...this.newSocialLink});
      this.newSocialLink = { name: '', url: '', icon: '' };
    }
  }

  removeSocialLink(index: number): void {
    this.contactPageContent.socialLinks.splice(index, 1);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}