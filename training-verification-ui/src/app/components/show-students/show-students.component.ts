import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { DatePipe } from '@angular/common';
import { iStudent } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditStudentModalComponent } from '../modals/add-edit-student-modal/add-edit-student-modal.component';
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

  openAddStudentModal() {
    const modalRef = this.modalService.open(AddEditStudentModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.student = null;
    modalRef.componentInstance.editMode = false;
    modalRef.result.then(result => {
      if (result) {
        this.students.push(result.object);
      }
    });
  }

  openEditStudentModal(student: iStudent) {
    const modalRef = this.modalService.open(AddEditStudentModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.student = student;
    modalRef.componentInstance.editMode = true;
  }

  openDeleteStudentModal(student: iStudent) {
    const modalRef = this.modalService.open(DeleteStudentModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.student = student;
    modalRef.result.then(result => {
      if (result && result.success) {
        let index = -1;
        index = this.students.findIndex(element => element.studentPk === result.itemPk);
        this.students.splice(index, 1);
      }
    });
  }

  trainingLevelToString(level: number) {
    return trainingLevelStrings[level];
  }

}
