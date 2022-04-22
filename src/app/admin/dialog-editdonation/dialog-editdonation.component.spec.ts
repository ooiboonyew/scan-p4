import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditdonationComponent } from './dialog-editdonation.component';

describe('DialogEditdonationComponent', () => {
  let component: DialogEditdonationComponent;
  let fixture: ComponentFixture<DialogEditdonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditdonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditdonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
