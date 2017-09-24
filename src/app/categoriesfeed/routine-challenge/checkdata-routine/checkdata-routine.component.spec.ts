import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckdataRoutineComponent } from './checkdata-routine.component';

describe('CheckdataRoutineComponent', () => {
  let component: CheckdataRoutineComponent;
  let fixture: ComponentFixture<CheckdataRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckdataRoutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckdataRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
