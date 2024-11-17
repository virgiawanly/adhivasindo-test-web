import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course, CourseStatus } from '../../../../../../types/courses';

export class CourseCompetencyForm extends FormGroup {
  constructor(competency?: { id?: number | null; name: string } | null) {
    super({
      id: new FormControl(competency?.id ?? null, []),
      name: new FormControl(competency?.name ?? '', [Validators.required, Validators.maxLength(255)]),
    });
  }
}

export class CourseForm extends FormGroup {
  constructor(course?: Course | null) {
    let toolIds: number[] = [];
    let competencies: CourseCompetencyForm[] = [];

    if (course) {
      toolIds = course.tools?.map((tool) => tool.id) ?? [];
      competencies =
        course.competencies?.map((competency) => {
          return new CourseCompetencyForm(competency);
        }) ?? [];
    }

    if (!competencies.length) {
      competencies.push(new CourseCompetencyForm(null));
    }

    super({
      name: new FormControl(course?.name ?? '', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl(course?.description ?? '', []),
      status: new FormControl(course?.status ?? CourseStatus.Draft, [Validators.required]),
      image: new FormControl('', !course ? [Validators.required] : []),
      tool_ids: new FormControl(toolIds, []),
      competencies: new FormArray(competencies, []),
    });
  }
}
