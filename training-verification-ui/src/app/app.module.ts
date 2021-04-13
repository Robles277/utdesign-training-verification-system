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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    StaffComponent,
    StudentComponent,
    ShowStudentsComponent,
    ScheduleNewStudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
