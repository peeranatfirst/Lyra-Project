import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSavingmoneyChallengeComponent } from './create-savingmoney-challenge.component';

describe('CreateSavingmoneyChallengeComponent', () => {
  let component: CreateSavingmoneyChallengeComponent;
  let fixture: ComponentFixture<CreateSavingmoneyChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSavingmoneyChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSavingmoneyChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
