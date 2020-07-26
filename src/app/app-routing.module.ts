import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from './modules/root-module/map/map.component';
import {MainPageComponent} from './modules/root-module/main-page/main-page.component';


const routes: Routes = [
  { path: 'contacts', component: MapComponent },
  { path: '', component: MainPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
