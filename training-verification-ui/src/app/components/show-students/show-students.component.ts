import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { iStudent } from '../../interfaces';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.css']
})
export class ShowStudentsComponent implements OnInit {
  
  students: iStudent[] = [];
    constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.studentService.getAllStudents().toPromise(),
    ]).then((results) => {
      this.students = results[0];
    });
  }

}
