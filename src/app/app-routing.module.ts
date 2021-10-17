import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { FourOFourComponent } from './shared/four-o-four/four-o-four.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemons', component: HomeComponent },
  { path: 'pokemons/:name', component: DetailsComponent },
  { path: '404', component: FourOFourComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
