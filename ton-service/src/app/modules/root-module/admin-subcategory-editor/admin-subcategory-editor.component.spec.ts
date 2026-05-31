import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminSubcategoryEditorComponent } from './admin-subcategory-editor.component';

describe('AdminSubcategoryEditorComponent', () => {
  let component: AdminSubcategoryEditorComponent;
  let fixture: ComponentFixture<AdminSubcategoryEditorComponent>;

  beforeEach(waitForAsync(() => {
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
