import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskStepComponent } from './create-task-step.component';

describe('CreateTaskStepComponent', () => {
  let component: CreateTaskStepComponent;
  let fixture: ComponentFixture<CreateTaskStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
