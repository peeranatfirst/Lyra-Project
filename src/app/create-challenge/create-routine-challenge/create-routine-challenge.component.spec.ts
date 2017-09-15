import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutineChallengeComponent } from './create-routine-challenge.component';

describe('CreateRoutineChallengeComponent', () => {
  let component: CreateRoutineChallengeComponent;
  let fixture: ComponentFixture<CreateRoutineChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoutineChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoutineChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
