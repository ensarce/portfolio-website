import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationService } from '../../services/animation.service';
import { SeoService } from '../../services/seo.service';

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
  
  socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: 'github'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: 'linkedin'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/yourphonenumber',
      icon: 'whatsapp'
    }
  ];
  
  constructor(
    private animationService: AnimationService,
    private seoService: SeoService
  ) {}
  
  ngOnInit() {
    // Set SEO metadata
    this.seoService.updateMetaTags(
      'İletişim - Yazılım Geliştirici Portföyü',
      'Bana ulaşmak için iletişim formunu doldurabilir veya sosyal medya hesaplarımdan ulaşabilirsiniz.',
      'yazılım geliştirici, iletişim, C#, .NET, Angular',
      'assets/images/contact-preview.jpg'
    );
    
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