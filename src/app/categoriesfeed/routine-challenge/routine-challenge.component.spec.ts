import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineChallengeComponent } from './routine-challenge.component';

describe('RoutineChallengeComponent', () => {
  let component: RoutineChallengeComponent;
  let fixture: ComponentFixture<RoutineChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutineChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
