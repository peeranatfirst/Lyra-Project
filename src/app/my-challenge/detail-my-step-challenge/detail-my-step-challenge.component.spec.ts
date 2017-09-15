import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMyStepChallengeComponent } from './detail-my-step-challenge.component';

describe('DetailMyStepChallengeComponent', () => {
  let component: DetailMyStepChallengeComponent;
  let fixture: ComponentFixture<DetailMyStepChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMyStepChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMyStepChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
