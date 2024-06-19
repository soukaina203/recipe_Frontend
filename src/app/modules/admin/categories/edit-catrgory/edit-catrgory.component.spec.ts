import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatrgoryComponent } from './edit-catrgory.component';

describe('EditCatrgoryComponent', () => {
  let component: EditCatrgoryComponent;
  let fixture: ComponentFixture<EditCatrgoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditCatrgoryComponent]
    });
    fixture = TestBed.createComponent(EditCatrgoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
