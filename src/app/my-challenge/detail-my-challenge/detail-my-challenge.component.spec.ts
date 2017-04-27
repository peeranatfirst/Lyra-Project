import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMyChallengeComponent } from './detail-my-challenge.component';

describe('DetailMyChallengeComponent', () => {
  let component: DetailMyChallengeComponent;
  let fixture: ComponentFixture<DetailMyChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMyChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMyChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
