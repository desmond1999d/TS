import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './modules/root-module/main-page/main-page.component';
import {ContactsPageComponent} from './modules/root-module/contacts-page/contacts-page.component';
import {SubcategoryExamplesComponent} from "./modules/root-module/subcategory-examples/subcategory-examples.component";
import {CategoryComponent} from "./modules/root-module/category/category.component";
import {CategoriesOverviewComponent} from "./modules/root-module/categories-overview/categories-overview.component";
import {AboutUsComponent} from "./modules/root-module/about-us/about-us.component";
import {CategoryExamplesResolver} from './resolvers/category-examples.resolver';
import {SubcategoryPageResolver} from './resolvers/subcategory-page.resolver';
import {CategoryMetaResolver} from './resolvers/category-meta.resolver';


const routes: Routes = [
  { path: 'contacts', component: ContactsPageComponent },
  { path: '', component: MainPageComponent },
  {
    path: 'category/:categoryId/subcategory/:subcategoryId',
    component: SubcategoryExamplesComponent,
    resolve: {
      pageData: SubcategoryPageResolver,
      category: CategoryMetaResolver,
    },
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin-module/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'category/:categoryId',
    component: CategoryComponent,
    resolve: {
      examples: CategoryExamplesResolver,
      category: CategoryMetaResolver,
    },
  },
  { path: 'demesnes', component: CategoriesOverviewComponent },
  { path: 'about-us', component: AboutUsComponent }
  // { path: '**', component: 404PageComponent }
  // TODO: add 404 page component
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
