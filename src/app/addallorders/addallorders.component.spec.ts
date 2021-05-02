import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddallordersComponent } from './addallorders.component';

describe('AddallordersComponent', () => {
  let component: AddallordersComponent;
  let fixture: ComponentFixture<AddallordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddallordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddallordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
