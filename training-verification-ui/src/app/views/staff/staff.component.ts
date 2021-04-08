import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { iStudent } from '../../interfaces';
import { ShowStudentsComponent } from 'src/app/components/show-students/show-students.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  students: iStudent[] = [];
  showStudents: boolean = false;

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

  scheduleNew() {

    alert("scheduleNew()");
  }
  manageSchedule() {
    alert("manageSchedule()");
  }
  manageStudents() {
    alert("manageStudents()");
  }
  viewLog() {
    alert("viewLog()");
  }
  showAllStudents() {
    this.showStudents = true;
  }
  postStudentTest() {
    let newStudent: iStudent = {
      studentId: "1234567890",
      netId: "tes100100",
      firstName: "Test",
      lastName: "McTesterson",
      trainingLevel: 0,
    };
    this.studentService.addStudent(newStudent).subscribe(result => {console.log("Post service: ", result)});
  }



}
