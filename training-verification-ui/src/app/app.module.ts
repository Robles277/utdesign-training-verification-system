import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/navbar/navbar.component';
import { StaffComponent } from './views/staff/staff.component';
import { StudentComponent } from './views/student/student.component';
import { ShowStudentsComponent } from './components/show-students/show-students.component';
import { ScheduleNewStudentComponent } from './components/schedule-new-student/schedule-new-student.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule, NgbModule, NgbTimepickerModule, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component'
import { AddEditStudentModalComponent } from './components/modals/add-edit-student-modal/add-edit-student-modal.component';
import { DeleteStudentModalComponent } from './components/modals/delete-student-modal/delete-student-modal.component';
import { ShowAppointmentsComponent } from './components/show-appointments/show-appointments.component';
import { ShowMachinesComponent } from './components/show-machines/show-machines.component';
import { AddEditMachineModalComponent } from './components/modals/add-edit-machine-modal/add-edit-machine-modal.component';
import { DeleteMachineModalComponent } from './components/modals/delete-machine-modal/delete-machine-modal.component';
import { CommonModule } from '@angular/common';
import { AddEditAppointmentModalComponent } from './components/modals/add-edit-appointment-modal/add-edit-appointment-modal.component';
import { DeleteAppointmentModalComponent } from './components/modals/delete-appointment-modal/delete-appointment-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    StaffComponent,
    StudentComponent,
    ShowStudentsComponent,
    ScheduleNewStudentComponent,
    LoginModalComponent,
    AddEditStudentModalComponent,
    DeleteStudentModalComponent,
    AddEditMachineModalComponent,
    DeleteMachineModalComponent,
    AddEditAppointmentModalComponent,
    DeleteAppointmentModalComponent,
    ShowAppointmentsComponent,
    ShowMachinesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
