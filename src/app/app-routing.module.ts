import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: 'weboldal-keszites', component: HomeComponent },
  { path: 'weboldal-keszites/privacy-policy', component: PrivacypolicyComponent },
  { path: 'weboldal-keszites/impressum', component: ImpressumComponent },
  { path: 'weboldal-keszites/terms-and-conditions', component: TermsComponent },
  { path: '**', redirectTo: 'weboldal-keszites', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
