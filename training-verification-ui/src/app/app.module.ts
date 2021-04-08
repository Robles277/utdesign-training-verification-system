import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaffComponent } from './views/staff/staff.component';
import { StudentComponent } from './views/student/student.component';
import { ShowStudentsComponent } from './components/show-students/show-students.component';
import { ScheduleNewStudentComponent } from './components/schedule-new-student/schedule-new-student.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    StudentComponent,
    ShowStudentsComponent,
    ScheduleNewStudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
