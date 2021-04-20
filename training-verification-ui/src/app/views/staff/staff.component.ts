import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  showStudents: boolean = false;
  showMachines: boolean = false;
  showAppointments: boolean = false;

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
    this.showMachines = false;
    this.showAppointments = false;
    this.showStudents = true;
  }
  showAllAppointments() {
    this.showStudents = false;
    this.showMachines = false;
    this.showAppointments = true;
  }
  showAllMachines() {
    this.showStudents = false;
    this.showAppointments = false;
    this.showMachines = true;
  }
  postStudentTest() {

  }

  postAppointmentTest() {

  }

  postUseRecordTest() {

  }



}
