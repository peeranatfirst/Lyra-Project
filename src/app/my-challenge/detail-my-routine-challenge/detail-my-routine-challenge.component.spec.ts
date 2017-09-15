import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMyRoutineChallengeComponent } from './detail-my-routine-challenge.component';

describe('DetailMyRoutineChallengeComponent', () => {
  let component: DetailMyRoutineChallengeComponent;
  let fixture: ComponentFixture<DetailMyRoutineChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMyRoutineChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMyRoutineChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
