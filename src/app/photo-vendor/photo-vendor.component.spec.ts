import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoVendorComponent } from './photo-vendor.component';

describe('PhotoVendorComponent', () => {
  let component: PhotoVendorComponent;
  let fixture: ComponentFixture<PhotoVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
