import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothSetupComponent } from './booth-setup.component';

describe('BoothSetupComponent', () => {
  let component: BoothSetupComponent;
  let fixture: ComponentFixture<BoothSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoothSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
