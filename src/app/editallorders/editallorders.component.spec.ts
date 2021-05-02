import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditallordersComponent } from './editallorders.component';

describe('EditallordersComponent', () => {
  let component: EditallordersComponent;
  let fixture: ComponentFixture<EditallordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditallordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditallordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
