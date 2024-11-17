import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolCreateModalComponent } from './tool-create-modal.component';

describe('ToolCreateModalComponent', () => {
  let component: ToolCreateModalComponent;
  let fixture: ComponentFixture<ToolCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolCreateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
