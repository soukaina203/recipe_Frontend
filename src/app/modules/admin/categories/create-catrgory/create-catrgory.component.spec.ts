import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCatrgoryComponent } from './create-catrgory.component';

describe('CreateCatrgoryComponent', () => {
  let component: CreateCatrgoryComponent;
  let fixture: ComponentFixture<CreateCatrgoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateCatrgoryComponent]
    });
    fixture = TestBed.createComponent(CreateCatrgoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
