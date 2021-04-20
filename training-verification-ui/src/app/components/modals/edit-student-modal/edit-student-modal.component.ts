import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs/operators";
import { trainingLevelStrings } from "src/app/enums";
import { iStudent } from "src/app/interfaces";
import { StudentService } from "src/app/services/student.service";
import { Helpers } from "src/helpers";

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.scss']
})

export class EditStudentModalComponent implements OnInit {
  @Input() student!: iStudent;
  public formStudent!: FormGroup;
  public selectedTrainingLevel: string = "";
  public trainingLevelStringsExtra = trainingLevelStrings;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
    this.selectedTrainingLevel = trainingLevelStrings[this.student.trainingLevel];

    this.formStudent = this.formBuilder.group({
      studentId: [this.student.studentId, [Validators.required, Helpers.validateStringIsNotEmpty()]],
      studentNetId: [this.student.netId, [Validators.required, Helpers.validateStringIsNotEmpty()]],
      studentFirstName: [this.student.firstName, [Validators.required, Helpers.validateStringIsNotEmpty()]],
      studentLastName: [this.student.lastName, [Validators.required, Helpers.validateStringIsNotEmpty()]],
      studentIdentifier: [this.student.identifier, []],
      studentTraining: [this.student.trainingLevel, []],
    });
  }

  selectTrainingLevel(newTrainingLevel: string) {
    this.selectedTrainingLevel = newTrainingLevel;
  }

  onClickSubmitButton(target: EventTarget | null) {
    let updatedStudent = this.buildStudent();
    updatedStudent.studentPk = this.student.studentPk;

    let button = <HTMLButtonElement>target;
    button.disabled = true;
    this.studentService.updateStudent(updatedStudent).pipe(
      finalize(() => {
        button.disabled = false;
      }))
      .subscribe(
        (result: boolean) => {
          if (result) {
            Helpers.individualKeyCopy(updatedStudent, this.student);
            // display a success message somewhere, can we get like a toast module
            this.activeModal.close();
            return;
          }
        },
        error => {
          console.error("Unable to update student!: ", error);
        }
      );
  }

  buildStudent() {
    let student: iStudent = {
      studentId: this.formStudent.get("studentId")!.value.trim(),
      netId: this.formStudent.get("studentNetId")!.value.trim(),
      firstName: this.formStudent.get("studentFirstName")!.value.trim(),
      lastName: this.formStudent.get("studentLastName")!.value.trim(),
      identifier: this.formStudent.get("studentIdentifier")!.value,
      trainingLevel: trainingLevelStrings.findIndex(tl => tl === this.selectedTrainingLevel)
    };
    return student;
  }


}
