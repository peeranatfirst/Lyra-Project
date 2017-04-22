import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingmoneyComponent } from './savingmoney.component';

describe('SavingmoneyComponent', () => {
  let component: SavingmoneyComponent;
  let fixture: ComponentFixture<SavingmoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingmoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
