import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterCreateModalComponent } from './chapter-create-modal.component';

describe('ChapterCreateModalComponent', () => {
  let component: ChapterCreateModalComponent;
  let fixture: ComponentFixture<ChapterCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterCreateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChapterCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
