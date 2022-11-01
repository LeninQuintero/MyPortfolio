import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editacercade ModalComponent } from './edit-acercade -modal.component';

describe('Editacercade ModalComponent', () => {
  let component: Editacercade ModalComponent;
  let fixture: ComponentFixture<Editacercade ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Editacercade ModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editacercade ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
