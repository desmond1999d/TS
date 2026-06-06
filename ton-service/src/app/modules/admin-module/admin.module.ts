import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { AdminSubcategoryEditorComponent } from '../root-module/admin-subcategory-editor/admin-subcategory-editor.component';

const routes: Routes = [
  {
    path: 'category/:categoryId/subcategory/:subcategoryId',
    component: AdminSubcategoryEditorComponent,
  },
];

@NgModule({
  declarations: [AdminSubcategoryEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild(routes),
  ],
})
export class AdminModule {
}
