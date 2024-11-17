import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterEditModalComponent } from './chapter-edit-modal.component';

describe('ChapterEditModalComponent', () => {
  let component: ChapterEditModalComponent;
  let fixture: ComponentFixture<ChapterEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterEditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChapterEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
