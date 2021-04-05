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

  public getAllAppointments(): Observable<iAppointment[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.get<iAppointment[]>(`api/appointments`, options).pipe(
      map(
      (results: iAppointment[]) => {
        return results;
      },
      (error: any) => {
        console.error("Failed to fetch appointments", error);
        return null;
      }
    ));
  }

  public getAppointment(pkAppointment: number): Observable<iAppointment> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.get<iAppointment>(`api/appointments/${pkAppointment}`, options).pipe(
      map(
      (result: iAppointment) => {
        return result;
      },
      (error: any) => {
        console.error(`Failed to fetch appointment of pk ${pkAppointment}`, error);
        return null;
      }
    ));
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
