import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploaddonationComponent } from './dialog-uploaddonation.component';

describe('DialogUploaddonationComponent', () => {
  let component: DialogUploaddonationComponent;
  let fixture: ComponentFixture<DialogUploaddonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUploaddonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUploaddonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
