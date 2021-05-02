import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditusedproductComponent } from './editusedproduct.component';

describe('EditusedproductComponent', () => {
  let component: EditusedproductComponent;
  let fixture: ComponentFixture<EditusedproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditusedproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditusedproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
