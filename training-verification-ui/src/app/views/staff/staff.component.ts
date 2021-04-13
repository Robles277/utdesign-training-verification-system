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

  students: iStudent[] = [];
  showStudents: boolean = false;
  csv: any

  constructor(
    private studentService: StudentService,
    private appointmentService: AppointmentService,
    private useRecordService: UseRecordService
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

  postAppointmentTest() {
    let newAppointment: iAppointment = {
      organizer: "New Guy, New Data",
      startTime: new Date("2000-09-29:18:38:00"),
      endTime: new Date("2000-09-29:19:40:00")
    };
    this.appointmentService.addAppointment(newAppointment).subscribe(result => {console.log("Post service: ", result)});
  }

  postUseRecordTest() {
    let newUseRecord: iUseRecord = {
      dateOfSignIn: new Date("2000-09-29:18:00:00"),
      dateOfSignOut: new Date("2000-09-29:19:40:00"),
      studentStudentPk: 1,
      machineMachinePk: 1
    }
    this.useRecordService.addUseRecord(newUseRecord).subscribe(result => {console.log("Post service: ", result)});
  }



}
