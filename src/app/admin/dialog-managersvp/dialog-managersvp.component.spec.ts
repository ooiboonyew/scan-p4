import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogManagersvpComponent } from './dialog-managersvp.component';

describe('DialogManagersvpComponent', () => {
  let component: DialogManagersvpComponent;
  let fixture: ComponentFixture<DialogManagersvpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogManagersvpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogManagersvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
