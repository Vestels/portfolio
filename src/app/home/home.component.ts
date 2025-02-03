import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  title = 'portfolio';

  contactForm!: FormGroup;

  isVisible = false;
  scrollIsVisible = true;
  
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  messageIcon: 'task_alt' | 'cancel' | null = null;

  private _bottomSheet = inject(MatBottomSheet);
  @ViewChild('formDirective') private formDirective!: FormGroupDirective;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      from: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

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

  async onSendEmail(event: Event): Promise<void> {
    event.preventDefault();

    if (this.contactForm.invalid) {
      return
    }

    const emailData = this.contactForm.value;

    try {
      const response = await firstValueFrom(this.http.post('https://email-service-7hn4.onrender.com/send-email', emailData, { responseType: 'text' }));
      this.showMessage('Az e-mail sikeresen elküldve!', 'success', 'task_alt');
      this.formDirective.resetForm();
    } catch (error) {
      this.showMessage('Nem sikerült elküldeni az e-mailt! Kérlek próbáld újra', 'error', 'cancel');
    }
  }

  showMessage(message: string, type: 'success' | 'error', icon: 'task_alt' | 'cancel'): void {
    this.messageIcon = icon;
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.messageIcon = null;
      this.message = null;
      this.messageType = null;
    }, 5000);
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
