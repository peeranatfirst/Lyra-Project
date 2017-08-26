import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepChallengeComponent } from './step-challenge.component';

describe('StepChallengeComponent', () => {
  let component: StepChallengeComponent;
  let fixture: ComponentFixture<StepChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
