import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogManageconfigComponent } from './dialog-manageconfig.component';

describe('DialogManageconfigComponent', () => {
  let component: DialogManageconfigComponent;
  let fixture: ComponentFixture<DialogManageconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogManageconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogManageconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
