import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcercadeModalComponent } from './edit-acercade-modal.component';

describe('EditAcercadeModalComponent', () => {
  let component: EditAcercadeModalComponent;
  let fixture: ComponentFixture<EditAcercadeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAcercadeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAcercadeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
