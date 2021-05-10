import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iStudent } from 'src/app/interfaces';
import { StudentService } from 'src/app/services/student.service';
import { Helpers } from 'src/helpers';
import { LoginModalComponent } from 'src/app/components/modals/login-modal/login-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';

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
    private notifyService: NotificationService,
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
    this.studentService.getStudent(this.loginForm.get("loginNetId")!.value.trim()).pipe(
      finalize(() => {
        if(this.currentStudent === undefined || this.currentStudent === null) {
          this.showUnknown();
        }
        else if(this.currentStudent.trainingLevel != 2) {
          this.notifyService.showError("You do not have the proper training level.", "Training Level Error");
        }
        else {
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

    this.loginForm.reset();
  }

  onLogout() {
    this.studentService.logoutStudentFromMachines(this.loginForm.get("loginNetId")!.value.trim())
      .subscribe(
      (result: boolean) => {
        if (result) {
          this.notifyService.showSuccess("Successfully logged out.");
        }
      },
      error => {
        this.notifyService.showError("Something went wrong!: " + error, "ERROR");
      }
    );
    this.loginForm.reset();
  }

  openLoginModal(student: iStudent) {
    const modalRef = this.modalService.open(LoginModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.student = student;
    modalRef.result.then(result => {
      if (result.objectList) {
        this.studentService.loginStudentToMachines(student, result.objectList)
          .subscribe(
            (result: boolean) => {
              this.notifyService.showSuccess("You have been logged in!");
            },
            error => {
              this.notifyService.showError("Unable to login! Make sure you logout first.", "Error");
              console.error("Error signing student in", error);
            }
          );
      }
    });
  }

  showUnknown() {
    alert("ERROR: No record of your netID exists in the current database. Please check your spelling or contact a staff member for assistance.");
  }
}
