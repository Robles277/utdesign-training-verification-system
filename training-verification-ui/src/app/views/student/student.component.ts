import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Helpers } from 'src/helpers';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  loginForm: FormGroup;
  machineForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
  ) {
    this.loginForm = this.formBuilder.group({
       loginNetId: [null, [Validators.required, Helpers.validateStringIsNotEmpty()]],
       teamName: [null]
    });

    this.machineForm = this.formBuilder.group({
      machineSelection: [null, [Validators.required]]
    });
  }

  onSubmit(): void {
    alert(JSON.stringify(this.loginForm.value));
    this.loginForm.reset();
    let currentStudent = this.studentService.getStudent(this.loginForm.get("loginNetId")!.value.trim());
  }

  showUnknown() {
    alert("ERROR: No record of your netID exists in the current database. Please check your spelling or contact a staff member for assistance.");
  }
  showGood() {
    alert("You are allowed into the lab.");
  }
}
