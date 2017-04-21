import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSavingMoneyComponent } from './detail-saving-money.component';

describe('DetailSavingMoneyComponent', () => {
  let component: DetailSavingMoneyComponent;
  let fixture: ComponentFixture<DetailSavingMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSavingMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSavingMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
