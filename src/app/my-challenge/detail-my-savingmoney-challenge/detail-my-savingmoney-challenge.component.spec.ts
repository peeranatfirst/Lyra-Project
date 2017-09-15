import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMySavingmoneyChallengeComponent } from './detail-my-savingmoney-challenge.component';

describe('DetailMyChallengeComponent', () => {
  let component: DetailMySavingmoneyChallengeComponent;
  let fixture: ComponentFixture<DetailMySavingmoneyChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMySavingmoneyChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMySavingmoneyChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
