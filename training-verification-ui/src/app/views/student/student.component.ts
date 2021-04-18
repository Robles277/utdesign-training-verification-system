import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iStudent } from 'src/app/interfaces';
import { StudentService } from 'src/app/services/student.service';
import { Helpers } from 'src/helpers';
import { LoginModalComponent } from 'src/app/components/modals/login-modal/login-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  loginForm: FormGroup;
  machineForm: FormGroup;
  currentStudent!: iStudent;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private modalService: NgbModal
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
    //alert(JSON.stringify(this.loginForm.value));
    this.studentService.getStudent(this.loginForm.get("loginNetId")!.value.trim()).pipe(
      finalize(() => {
        if(this.currentStudent === undefined || this.currentStudent === null) {
          this.showUnknown();
        }
        else {
          //console.log(this.currentStudent);
          this.openLoginModal(this.currentStudent);
        }
      }))
      .subscribe(
      (result: iStudent) => {
        this.currentStudent = result
      },
      error => {
        // this is error case code (http error returned)
      }
    ); // end pipe
    
    // Promise.all([
    //   this.studentService.getStudent(this.loginForm.get("loginNetId")!.value.trim()).toPromise(),
    // ]).then((result) => {
    //   this.currentStudent = result[0];
    // });
    
    
    this.loginForm.reset();
  }

  openLoginModal(student: iStudent) {
    const modalRef = this.modalService.open(LoginModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'  
    });
    modalRef.componentInstance.student = student;
  }

  showUnknown() {
    alert("ERROR: No record of your netID exists in the current database. Please check your spelling or contact a staff member for assistance.");
  }
  showGood() {
    alert("You are allowed into the lab.");
  }
}
