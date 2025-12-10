import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title
  ) { }

  /**
   * Updates the page title and meta tags for SEO
   */
  updateMetaTags(title: string, description: string, keywords: string, image?: string) {
    // Update title
    this.title.setTitle(title);

    // Update meta tags
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    
    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    
    if (image) {
      this.meta.updateTag({ property: 'og:image', content: image });
    }
    
    // Twitter tags
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    
    if (image) {
      this.meta.updateTag({ name: 'twitter:image', content: image });
    }
  }

  /**
   * Sets canonical URL for the page
   */
  setCanonicalURL(url: string) {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    } else {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
  }
}