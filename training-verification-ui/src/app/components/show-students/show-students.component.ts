import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { DatePipe } from '@angular/common';
import { iStudent } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditStudentModalComponent } from '../modals/edit-student-modal/edit-student-modal.component';
import { DeleteStudentModalComponent } from '../modals/delete-student-modal/delete-student-modal.component';
import { trainingLevelStrings } from 'src/app/enums';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.css']
})
export class ShowStudentsComponent implements OnInit {

  students: iStudent[] = [];
  currentDate: Date = new Date();

    constructor(
    private studentService: StudentService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.studentService.getAllStudents().toPromise(),
    ]).then((results) => {
      this.students = results[0];
    });
  }

  openEditStudentModal(student: iStudent) {
    const modalRef = this.modalService.open(EditStudentModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.student = student;
  }

  openDeleteStudentModal(student: iStudent) {
    const modalRef = this.modalService.open(DeleteStudentModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.student = student;
    modalRef.result.then(result => {
      // logic for whatever the modal returns
      // result is the "return value", "then" turns it into a promise
      // you can return a value from a modal (when you're within a modal and not here) via
      // this.activeModal.close(WHATVER YOU WANT TO RETURN)
    });
  }

  trainingLevelToString(level: number) {
    return trainingLevelStrings[level];
  }

}
