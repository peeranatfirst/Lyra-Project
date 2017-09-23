import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsTransactionComponent } from './steps-transaction.component';

describe('StepsTransactionComponent', () => {
  let component: StepsTransactionComponent;
  let fixture: ComponentFixture<StepsTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
