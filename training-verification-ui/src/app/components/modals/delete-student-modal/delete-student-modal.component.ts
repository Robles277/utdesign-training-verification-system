import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs/operators";
import { trainingLevelStrings } from "src/app/enums";
import { iStudent } from "src/app/interfaces";
import { StudentService } from "src/app/services/student.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: 'app-delete-student-modal',
  templateUrl: './delete-student-modal.component.html',
  styleUrls: ['./delete-student-modal.component.scss']
})

export class DeleteStudentModalComponent {
  @Input() student!: iStudent;

  constructor(
    private studentService: StudentService,
    private notifyService: NotificationService,
    public activeModal: NgbActiveModal,
  ) {

  }

  getTrainingLevelName() {
    return trainingLevelStrings[this.student.trainingLevel];
  }

  onClickSubmitButton(target: EventTarget | null) {
    let button = <HTMLButtonElement>target;
    button.disabled = true;
    this.studentService.deleteStudent(this.student.studentPk!).pipe(
      finalize(() => {
        button.disabled = false;
      }))
      .subscribe(
        (result: boolean) => {
          if (result) {
            this.activeModal.close({success: true, itemPk: this.student.studentPk!});
            this.notifyService.showSuccess("Student deleted successfully!");
            return;
          }
        },
        error => {
          console.error("Unable to delete student!: ", error);
          this.notifyService.showError(`Unable to delete student!: ${error}`, "ERROR");
        }
      );
  }


}
