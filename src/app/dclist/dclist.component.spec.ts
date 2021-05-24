import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DclistComponent } from './dclist.component';

describe('DclistComponent', () => {
  let component: DclistComponent;
  let fixture: ComponentFixture<DclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DclistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
