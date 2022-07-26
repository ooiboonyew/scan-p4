import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoUBSComponent } from './photo-ubs.component';

describe('PhotoUBSComponent', () => {
  let component: PhotoUBSComponent;
  let fixture: ComponentFixture<PhotoUBSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoUBSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoUBSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
