import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingskillsComponent } from './cookingskills.component';

describe('CookingskillsComponent', () => {
  let component: CookingskillsComponent;
  let fixture: ComponentFixture<CookingskillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookingskillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookingskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
