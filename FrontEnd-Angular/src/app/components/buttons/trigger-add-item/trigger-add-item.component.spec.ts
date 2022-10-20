import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerAddItemComponent } from './trigger-add-item.component';

describe('TriggerAddItemComponent', () => {
  let component: TriggerAddItemComponent;
  let fixture: ComponentFixture<TriggerAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriggerAddItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
