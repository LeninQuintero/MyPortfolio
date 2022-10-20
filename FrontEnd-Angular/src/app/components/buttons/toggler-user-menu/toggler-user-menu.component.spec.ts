import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglerUserMenuComponent } from './toggler-user-menu.component';

describe('TogglerUserMenuComponent', () => {
  let component: TogglerUserMenuComponent;
  let fixture: ComponentFixture<TogglerUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TogglerUserMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TogglerUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
