import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerLoginModalComponent } from './trigger-login-modal.component';

describe('TriggerLoginModalComponent', () => {
  let component: TriggerLoginModalComponent;
  let fixture: ComponentFixture<TriggerLoginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriggerLoginModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerLoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
