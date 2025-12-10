import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  constructor() { }

  /**
   * Applies scroll animations to elements with the 'scroll-animation' class
   */
  initScrollAnimations(): void {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.scroll-animation');
    hiddenElements.forEach(el => observer.observe(el));
  }

  /**
   * Applies hover effects to elements
   */
  initHoverEffects(): void {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return;
    }
    
    const hoverElements = document.querySelectorAll('.hover-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        el.classList.remove('hover');
      });
    });
  }
}