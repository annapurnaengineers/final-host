import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseproductComponent } from './purchaseproduct.component';

describe('PurchaseproductComponent', () => {
  let component: PurchaseproductComponent;
  let fixture: ComponentFixture<PurchaseproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
