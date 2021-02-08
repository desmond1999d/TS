import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubcategoryEditorComponent } from './admin-subcategory-editor.component';

describe('AdminSubcategoryEditorComponent', () => {
  let component: AdminSubcategoryEditorComponent;
  let fixture: ComponentFixture<AdminSubcategoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubcategoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubcategoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
