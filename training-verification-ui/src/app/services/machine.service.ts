import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iMachine } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MachineService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getAllMachines(): Observable<iMachine[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.get<iMachine[]>(`api/machines`, options).pipe(
      map(
      (results: iMachine[]) => {
        return results;
      },
      (error: any) => {
        console.error("Failed to fetch machines", error);
        return null;
      }
    ));
  }

  public getMachine(pkMachine: number): Observable<iMachine> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.get<iMachine>(`api/machines/${pkMachine}`, options).pipe(
      map(
      (result: iMachine) => {
        return result;
      },
      (error: any) => {
        console.error(`Failed to fetch machine of pk ${pkMachine}`, error);
        return null;
      }
    ));
  }

  public addMachine(newMachine: iMachine): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.post(`api/machines`, newMachine, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to add machine", error);
          return false;
        }
      ));
  }

  public updateMachine(updatedMachine: iMachine): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.put(`api/machines/${updatedMachine.machinePk}`, updatedMachine, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to update machine", error);
          return false;
        }
      ));
  }

  public deleteMachine(pkToDelete: number): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.delete(`api/machines/${pkToDelete}`, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to delete machine", error);
          return false;
        }
      ));
  }
}
