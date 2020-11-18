import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryExamplesComponent } from './subcategory-examples.component';

describe('SubcategoryExamplesComponent', () => {
  let component: SubcategoryExamplesComponent;
  let fixture: ComponentFixture<SubcategoryExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
