import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { iAppointment } from '../../interfaces';

@Component({
  selector: 'app-show-appointments',
  templateUrl: './show-appointments.component.html',
  styleUrls: ['./show-appointments.component.css']
})
export class ShowAppointmentsComponent implements OnInit {
  
  appointments: iAppointment[] = [];
  currentDate: Date = new Date();

  constructor(
    private apoointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.apoointmentService.getAllAppointments().toPromise(),
    ]).then((results) => {
      this.appointments = results[0];
    });
  }

}
