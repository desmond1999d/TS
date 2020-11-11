import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './modules/root-module/main-page/main-page.component';
import {ContactsPageComponent} from './modules/root-module/contacts-page/contacts-page.component';


const routes: Routes = [
  { path: 'contacts', component: ContactsPageComponent },
  { path: '', component: MainPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
