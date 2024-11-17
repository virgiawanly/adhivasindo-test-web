import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreateModalComponent } from './course-create-modal.component';

describe('CourseCreateModalComponent', () => {
  let component: CourseCreateModalComponent;
  let fixture: ComponentFixture<CourseCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCreateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
