import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerShowCertificateComponent } from './trigger-show-certificate.component';

describe('TriggerShowCertificateComponent', () => {
  let component: TriggerShowCertificateComponent;
  let fixture: ComponentFixture<TriggerShowCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriggerShowCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerShowCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
