import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryNavigatorComponent } from './subcategory-navigator.component';

describe('SubcategoyNavigatorComponent', () => {
  let component: SubcategoryNavigatorComponent;
  let fixture: ComponentFixture<SubcategoryNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
