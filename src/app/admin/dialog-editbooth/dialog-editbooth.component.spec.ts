import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditboothComponent } from './dialog-editboothcomponent';

describe('DialogEditboothComponent', () => {
  let component: DialogEditboothComponent;
  let fixture: ComponentFixture<DialogEditboothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditboothComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditboothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
