import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorsComponent } from './flavors.component';

describe('FlavorsComponent', () => {
  let component: FlavorsComponent;
  let fixture: ComponentFixture<FlavorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FlavorsComponent]
    });
    fixture = TestBed.createComponent(FlavorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
