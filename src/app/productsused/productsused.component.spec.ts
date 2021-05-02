import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsusedComponent } from './productsused.component';

describe('ProductsusedComponent', () => {
  let component: ProductsusedComponent;
  let fixture: ComponentFixture<ProductsusedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsusedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
