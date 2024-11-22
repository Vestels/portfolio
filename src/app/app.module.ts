import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


//Angular-Materials
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ObserveDirective } from './observe.directive';
import {
  MatBottomSheetModule
} from '@angular/material/bottom-sheet';
import { SnowComponent } from './snow/snow.component';


@NgModule({
  declarations: [
    AppComponent,
    ObserveDirective,
    SnowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //Angular-materials
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatBottomSheetModule
    
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
