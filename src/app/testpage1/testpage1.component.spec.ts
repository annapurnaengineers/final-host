import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testpage1Component } from './testpage1.component';

describe('Testpage1Component', () => {
  let component: Testpage1Component;
  let fixture: ComponentFixture<Testpage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Testpage1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Testpage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
