import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerEditItemComponent } from './trigger-edit-item.component';

describe('TriggerEditItemComponent', () => {
  let component: TriggerEditItemComponent;
  let fixture: ComponentFixture<TriggerEditItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriggerEditItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
