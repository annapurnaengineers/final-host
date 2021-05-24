import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddscrapComponent } from './addscrap.component';

describe('AddscrapComponent', () => {
  let component: AddscrapComponent;
  let fixture: ComponentFixture<AddscrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddscrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddscrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
