import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { iStudent } from "src/app/interfaces";
import { StudentService } from "src/app/services/student.service";

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


}
