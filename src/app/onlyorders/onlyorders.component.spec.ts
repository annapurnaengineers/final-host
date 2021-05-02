import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyordersComponent } from './onlyorders.component';

describe('OnlyordersComponent', () => {
  let component: OnlyordersComponent;
  let fixture: ComponentFixture<OnlyordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlyordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
