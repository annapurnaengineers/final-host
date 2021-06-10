import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmanualallordersComponent } from './addmanualallorders.component';

describe('AddmanualallordersComponent', () => {
  let component: AddmanualallordersComponent;
  let fixture: ComponentFixture<AddmanualallordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmanualallordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmanualallordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
