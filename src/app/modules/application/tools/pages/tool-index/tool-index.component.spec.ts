import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolIndexComponent } from './tool-index.component';

describe('ToolIndexComponent', () => {
  let component: ToolIndexComponent;
  let fixture: ComponentFixture<ToolIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
