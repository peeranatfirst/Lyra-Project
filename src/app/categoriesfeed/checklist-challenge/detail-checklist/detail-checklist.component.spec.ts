import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChecklistComponent } from './detail-checklist.component';

describe('DetailChecklistComponent', () => {
  let component: DetailChecklistComponent;
  let fixture: ComponentFixture<DetailChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
