import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonCreateModalComponent } from './lesson-create-modal.component';

describe('LessonCreateModalComponent', () => {
  let component: LessonCreateModalComponent;
  let fixture: ComponentFixture<LessonCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonCreateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
