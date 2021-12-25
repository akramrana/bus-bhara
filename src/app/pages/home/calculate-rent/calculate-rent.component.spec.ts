import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateRentComponent } from './calculate-rent.component';

describe('CalculateRentComponent', () => {
  let component: CalculateRentComponent;
  let fixture: ComponentFixture<CalculateRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
