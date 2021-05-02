import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclientpriceComponent } from './addclientprice.component';

describe('AddclientpriceComponent', () => {
  let component: AddclientpriceComponent;
  let fixture: ComponentFixture<AddclientpriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddclientpriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclientpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
