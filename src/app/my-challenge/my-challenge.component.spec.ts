import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChallengeComponent } from './my-challenge.component';

describe('MyChallengeComponent', () => {
  let component: MyChallengeComponent;
  let fixture: ComponentFixture<MyChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
