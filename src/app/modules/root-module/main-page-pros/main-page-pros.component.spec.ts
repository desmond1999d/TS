import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageProsComponent } from './main-page-pros.component';

describe('MainPageProsComponent', () => {
  let component: MainPageProsComponent;
  let fixture: ComponentFixture<MainPageProsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageProsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageProsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
