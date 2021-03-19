import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchComponent } from './views/launch/launch.component';
import { TestComponent } from './views/test/test.component';

const routes: Routes = [
  { path: 'launch', component: LaunchComponent },
  { path: 'test', component: TestComponent },
  { path: '', component: LaunchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
