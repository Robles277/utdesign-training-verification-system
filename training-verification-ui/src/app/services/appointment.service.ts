import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iAppointment } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppointmentService {

  constructor(
    private http: HttpClient
  ) {
  }

  // GET `api/appointments`
  public getAllAppointments(): Observable<iAppointment[]> {
    return null;
  }

  // GET `api/appointments/${pkAppointment}`
  public getAppointment(pkAppointment: number): Observable<iAppointment> {
    return null;
  }

  // POST `api/appointments`
  public addAppointment(newAppointment: iAppointment): void {
    return;
  }

  // PUT `api/appointments/${updatedAppointment.PkAppointment}`
  public updateAppointment(updatedAppointment: iAppointment): void {
    return;
  }

  // DELETE `api/appointments/${pkToDelete}`
  public deleteAppointment(pkToDelete: number): void {
    return;
  }
}
