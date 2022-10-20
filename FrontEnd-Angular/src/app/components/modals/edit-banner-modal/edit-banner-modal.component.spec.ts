import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBannerModalComponent } from './edit-banner-modal.component';

describe('EditBannerModalComponent', () => {
  let component: EditBannerModalComponent;
  let fixture: ComponentFixture<EditBannerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBannerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBannerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
