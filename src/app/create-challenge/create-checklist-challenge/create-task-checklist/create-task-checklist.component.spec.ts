import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskChecklistComponent } from './create-task-checklist.component';

describe('CreateTaskChecklistComponent', () => {
  let component: CreateTaskChecklistComponent;
  let fixture: ComponentFixture<CreateTaskChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
