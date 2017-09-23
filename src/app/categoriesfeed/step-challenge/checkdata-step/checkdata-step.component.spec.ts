import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckdataStepComponent } from './checkdata-step.component';

describe('CheckdataStepComponent', () => {
  let component: CheckdataStepComponent;
  let fixture: ComponentFixture<CheckdataStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckdataStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckdataStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
