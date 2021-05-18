import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclientlistComponent } from './editclientlist.component';

describe('EditclientlistComponent', () => {
  let component: EditclientlistComponent;
  let fixture: ComponentFixture<EditclientlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditclientlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclientlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
