import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainPagePortfolioComponent } from './main-page-portfolio.component';

describe('MainPagePortfolioComponent', () => {
  let component: MainPagePortfolioComponent;
  let fixture: ComponentFixture<MainPagePortfolioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPagePortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPagePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
