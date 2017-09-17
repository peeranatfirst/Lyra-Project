import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneChecklistComponent } from './done-checklist.component';

describe('DoneChecklistComponent', () => {
  let component: DoneChecklistComponent;
  let fixture: ComponentFixture<DoneChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
