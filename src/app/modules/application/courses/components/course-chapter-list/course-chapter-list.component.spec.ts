import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChapterListComponent } from './course-chapter-list.component';

describe('CourseChapterListComponent', () => {
  let component: CourseChapterListComponent;
  let fixture: ComponentFixture<CourseChapterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseChapterListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseChapterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
