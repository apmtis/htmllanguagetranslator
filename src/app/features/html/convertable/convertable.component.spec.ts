import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertableComponent } from './convertable.component';

describe('ConvertableComponent', () => {
  let component: ConvertableComponent;
  let fixture: ComponentFixture<ConvertableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
