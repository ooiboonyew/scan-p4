import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCheckedinComponent } from './guest-checkedin.component';

describe('GuestCheckedinComponent', () => {
  let component: GuestCheckedinComponent;
  let fixture: ComponentFixture<GuestCheckedinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestCheckedinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCheckedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
