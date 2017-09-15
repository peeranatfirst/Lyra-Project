import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStepChallengeComponent } from './create-step-challenge.component';

describe('CreateStepChallengeComponent', () => {
  let component: CreateStepChallengeComponent;
  let fixture: ComponentFixture<CreateStepChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStepChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStepChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
