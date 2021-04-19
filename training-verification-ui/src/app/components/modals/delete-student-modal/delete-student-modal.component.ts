import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs/operators";
import { trainingLevelStrings } from "src/app/enums";
import { iStudent } from "src/app/interfaces";
import { StudentService } from "src/app/services/student.service";
import { Helpers } from "src/helpers";

@Component({
  selector: 'app-delete-student-modal',
  templateUrl: './delete-student-modal.component.html',
  styleUrls: ['./delete-student-modal.component.scss']
})

export class DeleteStudentModalComponent {
  @Input() student!: iStudent;

  constructor(
    private studentService: StudentService,
    public activeModal: NgbActiveModal
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
            // display a success message somewhere, can we get like a toast module
            this.activeModal.close({success: true, itemPk: this.student.studentPk!});
            return;
          }
        },
        error => {
          console.error("Unable to delete student!: ", error);
        }
      );
  }


}
