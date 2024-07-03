import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRecipesComponent } from './top-recipes.component';

describe('TopRecipesComponent', () => {
  let component: TopRecipesComponent;
  let fixture: ComponentFixture<TopRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TopRecipesComponent]
    });
    fixture = TestBed.createComponent(TopRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
