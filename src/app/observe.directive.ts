import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appObserve]'
})
export class ObserveDirective implements OnInit {

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('show');
          this.el.nativeElement.classList.add('no-delay');
          observer.unobserve(this.el.nativeElement);
        }
      });
    });

    observer.observe(this.el.nativeElement);
  }
}