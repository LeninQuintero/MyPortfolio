import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCertificationModalComponent } from './edit-certification-modal.component';

describe('EditCertificationModalComponent', () => {
  let component: EditCertificationModalComponent;
  let fixture: ComponentFixture<EditCertificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCertificationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCertificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
