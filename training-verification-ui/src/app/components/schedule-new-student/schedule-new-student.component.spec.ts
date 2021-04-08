import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleNewStudentComponent } from './schedule-new-student.component';

describe('ScheduleNewStudentComponent', () => {
  let component: ScheduleNewStudentComponent;
  let fixture: ComponentFixture<ScheduleNewStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleNewStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleNewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
