import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteinvoicepageComponent } from './quoteinvoicepage.component';

describe('QuoteinvoicepageComponent', () => {
  let component: QuoteinvoicepageComponent;
  let fixture: ComponentFixture<QuoteinvoicepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteinvoicepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteinvoicepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
