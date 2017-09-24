import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRoutineComponent } from './detail-routine.component';

describe('DetailRoutineComponent', () => {
  let component: DetailRoutineComponent;
  let fixture: ComponentFixture<DetailRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRoutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
