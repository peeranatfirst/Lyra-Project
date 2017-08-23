import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChecklistChallengeComponent } from './create-checklist-challenge.component';

describe('CreateChecklistChallengeComponent', () => {
  let component: CreateChecklistChallengeComponent;
  let fixture: ComponentFixture<CreateChecklistChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChecklistChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChecklistChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
