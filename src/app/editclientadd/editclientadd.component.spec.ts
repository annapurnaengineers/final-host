import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclientaddComponent } from './editclientadd.component';

describe('EditclientaddComponent', () => {
  let component: EditclientaddComponent;
  let fixture: ComponentFixture<EditclientaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditclientaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclientaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
