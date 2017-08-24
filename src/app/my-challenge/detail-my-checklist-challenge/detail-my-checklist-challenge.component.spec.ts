import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMyChecklistChallengeComponent } from './detail-my-checklist-challenge.component';

describe('DetailMyChecklistChallengeComponent', () => {
  let component: DetailMyChecklistChallengeComponent;
  let fixture: ComponentFixture<DetailMyChecklistChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMyChecklistChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMyChecklistChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
