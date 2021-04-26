import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { iAppointment, iStudent, iUseRecord } from '../../interfaces';
import { ShowStudentsComponent } from 'src/app/components/show-students/show-students.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UseRecordService } from 'src/app/services/use-record.service';
import { saveAs } from 'file-saver';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  showStudents: boolean = false;
  showMachines: boolean = false;
  showAppointments: boolean = false;
  csv: any

  constructor(private useRecordService: UseRecordService,

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

  uploadcsv(f: NgForm) {
    // e.preventDefault()

    console.log(f.value);

  }



  downloadLog()
  {
    this.useRecordService.getTextFile('api/use-records/downloadCSV')
      .subscribe(data => {
        let newblob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
        saveAs(newblob, 'log.csv');
      });
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
