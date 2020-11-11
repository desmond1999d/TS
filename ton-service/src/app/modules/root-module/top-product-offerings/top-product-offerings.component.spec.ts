import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProductOfferingsComponent } from './top-product-offerings.component';

describe('TopProductOfferingsComponent', () => {
  let component: TopProductOfferingsComponent;
  let fixture: ComponentFixture<TopProductOfferingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopProductOfferingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopProductOfferingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
