import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRouteRequestComponent } from './add-route-request.component';

describe('AddRouteRequestComponent', () => {
  let component: AddRouteRequestComponent;
  let fixture: ComponentFixture<AddRouteRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRouteRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRouteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
