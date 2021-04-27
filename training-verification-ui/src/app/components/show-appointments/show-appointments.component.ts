import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { iAppointment } from '../../interfaces';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditAppointmentModalComponent } from '../modals/add-edit-appointment-modal/add-edit-appointment-modal.component';
import { DeleteAppointmentModalComponent } from '../modals/delete-appointment-modal/delete-appointment-modal.component';

@Component({
  selector: 'app-show-appointments',
  templateUrl: './show-appointments.component.html',
  styleUrls: ['./show-appointments.component.css']
})
export class ShowAppointmentsComponent implements OnInit {

  appointments: iAppointment[] = [];
  currentDate: Date = new Date();

  constructor(
    private apoointmentService: AppointmentService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.apoointmentService.getAllAppointments().toPromise(),
    ]).then((results) => {
      this.appointments = results[0];
    });
  }

  openAddAppointmentModal() {
    const modalRef = this.modalService.open(AddEditAppointmentModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.appointment = null;
    modalRef.componentInstance.editMode = false;
    modalRef.result.then(result => {
      if (result) {
        this.appointments.push(result.object);
      }
    });
  }

  openEditAppointmentModal(appointment: iAppointment) {
    const modalRef = this.modalService.open(AddEditAppointmentModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.appointment = appointment;
    modalRef.componentInstance.editMode = true;
  }

  openDeleteAppointmentModal(appointment: iAppointment) {
    const modalRef = this.modalService.open(DeleteAppointmentModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.appointment = appointment;
    modalRef.result.then(result => {
      if (result && result.success) {
        let index = -1;
        index = this.appointments.findIndex(element => element.idAppointment === result.itemPk);
        this.appointments.splice(index, 1);
      }
    });
  }

}
