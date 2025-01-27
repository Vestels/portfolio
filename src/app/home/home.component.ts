import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  title = 'portfolio';
  subjectInput: string = '';
  emailInput: string = '';
  messageInput: string = '';
  isVisible = false;
  scrollIsVisible = true;

  private _bottomSheet = inject(MatBottomSheet);

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isVisible = window.scrollY > 400;
    this.scrollIsVisible = window.scrollY < 50;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(hamburger);

    bottomSheetRef.afterDismissed().subscribe((id: string) => {
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  readonly subject = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly message = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);

  scrollToElement(elementId: string) {
    const target = document.getElementById(elementId);
    if (target) {
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const scrollToPosition = elementRect - bodyRect;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
    }
  }

  openEmailClient() {
    const email = encodeURIComponent('rokszinroland@gmail.com');
    const subject = encodeURIComponent(this.subjectInput);
    const message = encodeURIComponent(this.messageInput);

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${message}`;

    window.location.href = mailtoLink;
  }
}

@Component({
  selector: 'hamburger',
  templateUrl: '../hamburger.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [MatListModule, MatButtonModule],
})
export class hamburger {
  @Output() navigateToSection = new EventEmitter<string>();

  constructor(private bottomSheetRef: MatBottomSheetRef<hamburger>) {}
  private _bottomSheetRef =
    inject<MatBottomSheetRef<hamburger>>(MatBottomSheetRef);

  openLink(event: MouseEvent, id: string): void {
    this._bottomSheetRef.dismiss(id);
    event.preventDefault();
  }
}
