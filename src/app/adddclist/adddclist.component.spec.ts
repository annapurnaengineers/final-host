import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddclistComponent } from './adddclist.component';

describe('AdddclistComponent', () => {
  let component: AdddclistComponent;
  let fixture: ComponentFixture<AdddclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddclistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
