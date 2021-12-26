import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalBusListComponent } from './local-bus-list.component';

describe('LocalBusListComponent', () => {
  let component: LocalBusListComponent;
  let fixture: ComponentFixture<LocalBusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalBusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalBusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
