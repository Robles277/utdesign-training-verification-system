import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iMachine } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
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

  // POST `api/machines`
  public addMachine(newMachine: iMachine): void {
    return;
  }

  // PUT `api/machines/${updatedMachine.machinePk}`
  public updateMachine(updatedMachine: iMachine): void {
    return;
  }

  // DELETE `api/machines/${pkToDelete}`
  public deleteMachine(pkToDelete: number): void {
    return;
  }
}
