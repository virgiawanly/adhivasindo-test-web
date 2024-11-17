import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEditModalComponent } from './tool-edit-modal.component';

describe('ToolEditModalComponent', () => {
  let component: ToolEditModalComponent;
  let fixture: ComponentFixture<ToolEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolEditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
