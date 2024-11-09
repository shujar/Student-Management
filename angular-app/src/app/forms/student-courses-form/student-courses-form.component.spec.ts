import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursesFormComponent } from './student-courses-form.component';

describe('StudentCoursesFormComponent', () => {
  let component: StudentCoursesFormComponent;
  let fixture: ComponentFixture<StudentCoursesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCoursesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCoursesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
