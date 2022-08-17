import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCheckinComponent } from './guest-checkin.component';

describe('GuestCheckinComponent', () => {
  let component: GuestCheckinComponent;
  let fixture: ComponentFixture<GuestCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
