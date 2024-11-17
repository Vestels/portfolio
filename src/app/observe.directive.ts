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
        } else {
          this.el.nativeElement.classList.remove('show');
        }
      });
    });

    observer.observe(this.el.nativeElement);
  }
}