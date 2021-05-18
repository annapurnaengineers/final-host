import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclientlistComponent } from './addclientlist.component';

describe('AddclientlistComponent', () => {
  let component: AddclientlistComponent;
  let fixture: ComponentFixture<AddclientlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddclientlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclientlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
