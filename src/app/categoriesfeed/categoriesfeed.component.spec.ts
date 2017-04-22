import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesfeedComponent } from './categoriesfeed.component';

describe('CategoriesfeedComponent', () => {
  let component: CategoriesfeedComponent;
  let fixture: ComponentFixture<CategoriesfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
