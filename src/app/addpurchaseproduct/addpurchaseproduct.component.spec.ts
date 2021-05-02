import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpurchaseproductComponent } from './addpurchaseproduct.component';

describe('AddpurchaseproductComponent', () => {
  let component: AddpurchaseproductComponent;
  let fixture: ComponentFixture<AddpurchaseproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpurchaseproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpurchaseproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
