import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { iStudent } from "src/app/interfaces";
import { StudentService } from "src/app/services/student.service";

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.scss']
})

export class EditStudentModalComponent {
  @Input() student!: iStudent;

  constructor(
    private studentService: StudentService,
    public activeModal: NgbActiveModal
  ) {

  }


}
