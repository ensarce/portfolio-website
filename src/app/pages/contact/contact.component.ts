import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationService } from '../../services/animation.service';
import { SeoService } from '../../services/seo.service';
import { ContentManagementService, SiteSettings } from '../../admin/services/content-management.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  name = '';
  email = '';
  subject = '';
  message = '';
  
  siteSettings: SiteSettings = {
    theme: {
      primaryColor: '#00c3ff',
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      darkMode: true
    },
    hero: {
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: '',
      isActive: true
    },
    about: {
      title: '',
      developerBackgroundTitle: '',
      developerBackground: '',
      healthcareExperienceTitle: '',
      healthcareExperience: '',
      apiIntegrationsTitle: '',
      apiIntegrations: [],
      agentJobsTitle: '',
      agentJobs: [],
      dashboardProjectsTitle: '',
      dashboardProjects: [],
      imageUrl: '',
      isActive: true
    },
    skills: {
      title: '',
      certificatesTitle: '',
      isActive: true
    },
    projects: {
      title: '',
      isActive: true
    },
    contact: {
      title: 'İletişim',
      contactFormTitle: '',
      contactInfoTitle: '',
      socialMediaTitle: '',
      downloadCvTitle: '',
      emailLabel: '',
      phoneLabel: '',
      addressLabel: '',
      namePlaceholder: '',
      emailPlaceholder: '',
      subjectPlaceholder: '',
      messagePlaceholder: '',
      sendMessageButton: '',
      email: 'email@example.com',
      phone: '+90 555 555 55 55',
      address: 'İstanbul, Türkiye',
      socialLinks: [],
      isActive: true
    },
    footer: {
      copyrightText: '',
      socialLinks: [],
      isActive: true
    },
    isActive: true
  };
  
  constructor(
    private animationService: AnimationService,
    private seoService: SeoService,
    private contentService: ContentManagementService
  ) {}
  
  ngOnInit() {
    // Set SEO metadata
    this.seoService.updateMetaTags(
      'İletişim - Yazılım Geliştirici Portföyü',
      'Bana ulaşmak için iletişim formunu doldurabilir veya sosyal medya hesaplarımdan ulaşabilirsiniz.',
      'yazılım geliştirici, iletişim, C#, .NET, Angular',
      'assets/images/contact-preview.jpg'
    );
    
    // Load content from service
    this.contentService.getSiteSettings().subscribe(settings => {
      this.siteSettings = {...settings};
    });
    
    // Initialize animations after view loads
    setTimeout(() => {
      this.animationService.initScrollAnimations();
      this.animationService.initHoverEffects();
    }, 100);
  }
  
  submitForm() {
    // Form submission logic would go here
    console.log('Form submitted:', { name: this.name, email: this.email, subject: this.subject, message: this.message });
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağım.');
    
    // Reset form
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }
}