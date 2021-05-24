import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcinvoicepageComponent } from './dcinvoicepage.component';

describe('DcinvoicepageComponent', () => {
  let component: DcinvoicepageComponent;
  let fixture: ComponentFixture<DcinvoicepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcinvoicepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcinvoicepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
