import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iAppointment } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
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

  public addAppointment(newAppointment: iAppointment): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.post(`api/appointments`, newAppointment, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to add appointment", error);
          return false;
        }
      ));
  }

  public updateAppointment(updatedAppointment: iAppointment): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.put(`api/appointments/${updatedAppointment.idAppointment}`, updatedAppointment, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to update appointment", error);
          return false;
        }
      ));
  }

  public deleteAppointment(pkToDelete: number): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.delete(`api/appointments/${pkToDelete}`, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to delete appointment", error);
          return false;
        }
      ));
  }
}
