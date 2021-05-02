import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddusedproductComponent } from './addusedproduct.component';

describe('AddusedproductComponent', () => {
  let component: AddusedproductComponent;
  let fixture: ComponentFixture<AddusedproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddusedproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddusedproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
