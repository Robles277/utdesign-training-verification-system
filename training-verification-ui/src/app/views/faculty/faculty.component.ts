import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { iStudent } from '../../interfaces';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  students: iStudent[] = [];

  constructor(
    private studentService: StudentService
  ) {
  }

  ngOnInit(): void {
    Promise.all([
      this.studentService.getAllStudents().toPromise(),
    ]).then((results) => {
      this.students = results[0];
    });
  }

  debugStudents(): void {
    console.log(this.students);
  }
}
