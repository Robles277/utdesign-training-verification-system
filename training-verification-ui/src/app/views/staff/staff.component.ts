import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  showStudents: boolean = false;

  constructor(

  ) { }

  ngOnInit(): void {

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

  }

  postAppointmentTest() {

  }

  postUseRecordTest() {

  }



}
