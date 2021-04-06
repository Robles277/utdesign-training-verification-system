import { Component, OnInit } from '@angular/core';
//import { StudentService } from '../../services/student.service';
import { iStudent } from '../../interfaces';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  students: iStudent[] = [];

  constructor() 
  {}

  ngOnInit(): void {
    // Promise.all([
    //   this.studentService.getAllStudents().toPromise(),
    // ]).then((results) => {
    //   this.students = results[0];
    // });
  }

  scheduleNew()
  {
    alert("scheduleNew()");
  }
  manageSchedule()
  {
    alert("manageSchedule()");
  }
  manageStudents()
  {
    alert("manageStudents()");
  }
  viewLog()
  {
    alert("viewLog()");
  }



}
