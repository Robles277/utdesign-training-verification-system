import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchComponent } from './views/launch/launch.component';
import { StaffComponent } from './views/staff/staff.component'
import { StudentComponent } from './views/student/student.component';

const routes: Routes = [
  { path: 'launch', component: LaunchComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'student', component: StudentComponent},
  { path: '', component: StudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
