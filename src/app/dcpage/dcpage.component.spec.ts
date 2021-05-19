import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpageComponent } from './dcpage.component';

describe('DcpageComponent', () => {
  let component: DcpageComponent;
  let fixture: ComponentFixture<DcpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
