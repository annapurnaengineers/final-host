import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpurchaseproductComponent } from './editpurchaseproduct.component';

describe('EditpurchaseproductComponent', () => {
  let component: EditpurchaseproductComponent;
  let fixture: ComponentFixture<EditpurchaseproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpurchaseproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpurchaseproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
