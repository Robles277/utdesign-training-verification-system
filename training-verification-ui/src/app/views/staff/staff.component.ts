import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { iAppointment, iStudent, iUseRecord } from '../../interfaces';
import { ShowStudentsComponent } from 'src/app/components/show-students/show-students.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UseRecordService } from 'src/app/services/use-record.service';
import { MachineService } from 'src/app/services/machine.service';
import { saveAs } from 'file-saver';
import { NgForm } from '@angular/forms';

import { NotificationService } from 'src/app/services/notification.service'


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {

  showStudents: boolean = false;
  showMachines: boolean = false;
  showAppointments: boolean = false;
  csv: any

  constructor(
    private useRecordService: UseRecordService,
    private studentService: StudentService,
    private machineService: MachineService,
    private notifyService : NotificationService
  ) {  }

  showForm(id:string) {
    var x = document.getElementById(id);
    if (x!.style.display == "none")
      x!.style.display = "block";
    else
      x!.style.display = "none";
  }

  uploadStudentcsv(f: NgForm) {
    console.log(f.value);
    let file = (document.getElementById("file") as HTMLInputElement).files?.[0];
    let formData = new FormData();
    formData.append("file", file as Blob, "");
    this.studentService.uploadStudentCSV(formData).subscribe(data => {
      alert("File uploaded.");
    })
  }

  uploadMachinecsv(f: NgForm) {
    console.log(f.value);
    let file = (document.getElementById("file1") as HTMLInputElement).files?.[0];
    let formData = new FormData();
    formData.append("file", file as Blob, "");
    this.machineService.uploadMachineCSV(formData).subscribe(data => {
      alert("File uploaded.");
    })
  }


  downloadLog() {
    this.useRecordService.getTextFile('api/use-records/downloadCSV')
      .subscribe(data => {
        let newblob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
        saveAs(newblob, 'log.csv');
      });
      this.notifyService.showSuccess("Downloading data...");
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
}
