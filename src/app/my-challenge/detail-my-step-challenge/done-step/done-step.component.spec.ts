import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneStepComponent } from './done-step.component';

describe('DoneStepComponent', () => {
  let component: DoneStepComponent;
  let fixture: ComponentFixture<DoneStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
