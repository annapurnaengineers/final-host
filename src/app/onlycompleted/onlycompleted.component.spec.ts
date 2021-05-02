import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlycompletedComponent } from './onlycompleted.component';

describe('OnlycompletedComponent', () => {
  let component: OnlycompletedComponent;
  let fixture: ComponentFixture<OnlycompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlycompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlycompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
