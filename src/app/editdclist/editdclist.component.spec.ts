import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdclistComponent } from './editdclist.component';

describe('EditdclistComponent', () => {
  let component: EditdclistComponent;
  let fixture: ComponentFixture<EditdclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdclistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
