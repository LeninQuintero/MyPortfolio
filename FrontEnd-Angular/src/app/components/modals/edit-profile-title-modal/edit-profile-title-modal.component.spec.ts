import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileTitleModalComponent } from './edit-profile-title-modal.component';

describe('EditProfileTitleModalComponent', () => {
  let component: EditProfileTitleModalComponent;
  let fixture: ComponentFixture<EditProfileTitleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileTitleModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileTitleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
