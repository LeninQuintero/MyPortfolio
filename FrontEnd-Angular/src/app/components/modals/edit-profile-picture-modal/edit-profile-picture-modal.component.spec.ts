import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePictureModalComponent } from './edit-profile-picture-modal.component';

describe('EditProfilePictureModalComponent', () => {
  let component: EditProfilePictureModalComponent;
  let fixture: ComponentFixture<EditProfilePictureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfilePictureModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfilePictureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
