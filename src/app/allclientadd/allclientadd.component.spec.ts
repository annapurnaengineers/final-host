import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllclientaddComponent } from './allclientadd.component';

describe('AllclientaddComponent', () => {
  let component: AllclientaddComponent;
  let fixture: ComponentFixture<AllclientaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllclientaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllclientaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
