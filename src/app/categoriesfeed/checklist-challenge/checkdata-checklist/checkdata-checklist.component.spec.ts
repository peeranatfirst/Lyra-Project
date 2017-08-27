import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckdataChecklistComponent } from './checkdata-checklist.component';

describe('CheckdataChecklistComponent', () => {
  let component: CheckdataChecklistComponent;
  let fixture: ComponentFixture<CheckdataChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckdataChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckdataChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
