import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterLessonListComponent } from './chapter-lesson-list.component';

describe('ChapterLessonListComponent', () => {
  let component: ChapterLessonListComponent;
  let fixture: ComponentFixture<ChapterLessonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterLessonListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChapterLessonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
