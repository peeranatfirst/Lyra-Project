import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistChallengeComponent } from './checklist-challenge.component';

describe('ChecklistChallengeComponent', () => {
  let component: ChecklistChallengeComponent;
  let fixture: ComponentFixture<ChecklistChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
