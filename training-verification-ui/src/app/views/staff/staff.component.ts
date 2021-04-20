import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { iAppointment, iStudent, iUseRecord } from '../../interfaces';
import { ShowStudentsComponent } from 'src/app/components/show-students/show-students.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UseRecordService } from 'src/app/services/use-record.service';
import * as FileSaver from 'file-saver';

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

  downloadLog()
  {
    //this.useRecordService.getTextFile('api/use-record/downloadCSV').subscribe(data => {
    //  const newblob = new Blob([data], { type: 'text/csv' });
    //  FileSaver.saveAs(newblob, 'log.csv');
  //  }) ;
  
    this.useRecordService.getTextFile('api/use-records/downloadCSV')
        .subscribe(data => this.csv = data); // what
    


      let newblob = new Blob([this.csv], { type: 'text/csv;charset=utf-8;' });
      FileSaver.saveAs(newblob, 'log.csv');
    
      /*var url= window.URL.createObjectURL(newblob);
      let link = document.createElement("a");
      link.download = "log.csv";
      link.href = window.URL.createObjectURL(this.csv); // me have no idea what i am doing
      link.href = this.csv;
      link.href = url;
      link.click();*/
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
