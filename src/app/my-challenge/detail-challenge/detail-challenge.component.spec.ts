import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChallengeComponent } from './detail-challenge.component';

describe('DetailChallengeComponent', () => {
  let component: DetailChallengeComponent;
  let fixture: ComponentFixture<DetailChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
