import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckdataSavingmoneyComponent } from './checkdata-savingmoney.component';

describe('CheckdataSavingmoneyComponent', () => {
  let component: CheckdataSavingmoneyComponent;
  let fixture: ComponentFixture<CheckdataSavingmoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckdataSavingmoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckdataSavingmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
