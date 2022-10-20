import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCertificateModalComponent } from './show-certificate-modal.component';

describe('ShowCertificateModalComponent', () => {
  let component: ShowCertificateModalComponent;
  let fixture: ComponentFixture<ShowCertificateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCertificateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCertificateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
