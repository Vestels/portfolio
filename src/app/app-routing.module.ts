import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'privacy-policy', component: PrivacypolicyComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'terms-and-conditions', component: TermsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
