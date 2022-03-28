import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindedPropComponent } from './binded-prop.component';

describe('BindedPropComponent', () => {
  let component: BindedPropComponent;
  let fixture: ComponentFixture<BindedPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BindedPropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BindedPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
