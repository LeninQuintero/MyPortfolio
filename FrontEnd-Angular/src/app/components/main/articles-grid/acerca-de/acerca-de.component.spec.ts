import { ComponentFixture, TestBed } from '@angular/core/testing';

import { acercade Component } from './acerca-de.component';

describe('acercade Component', () => {
  let component: acercade Component;
  let fixture: ComponentFixture<acercade Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ acercade Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(acercade Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
