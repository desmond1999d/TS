import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './modules/root-module/main-page/main-page.component';
import {ContactsPageComponent} from './modules/root-module/contacts-page/contacts-page.component';
import {SubcategoryNavigatorComponent} from "./modules/root-module/subcategoy-navigator/subcategory-navigator.component";


const routes: Routes = [
  { path: 'contacts', component: ContactsPageComponent },
  { path: '', component: MainPageComponent },
  { path: 'category/:categoryId/subcategory/:subcategoryId', component: SubcategoryNavigatorComponent }
  // { path: '**', component: 404PageComponent }
  // TODO: add 404 page component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
