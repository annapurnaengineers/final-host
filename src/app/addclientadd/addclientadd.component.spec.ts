import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclientaddComponent } from './addclientadd.component';

describe('AddclientaddComponent', () => {
  let component: AddclientaddComponent;
  let fixture: ComponentFixture<AddclientaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddclientaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclientaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
