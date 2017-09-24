import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneRoutineComponent } from './done-routine.component';

describe('DoneRoutineComponent', () => {
  let component: DoneRoutineComponent;
  let fixture: ComponentFixture<DoneRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneRoutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
