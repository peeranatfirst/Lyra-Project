import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistTaskTransactionComponent } from './checklist-task-transaction.component';

describe('ChecklistTaskTransactionComponent', () => {
  let component: ChecklistTaskTransactionComponent;
  let fixture: ComponentFixture<ChecklistTaskTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistTaskTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistTaskTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
