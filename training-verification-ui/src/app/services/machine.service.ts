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

  // GET `api/machines`
  public getAllMachines(): Observable<iMachine[]> {
    return null;
  }

  // GET `api/machines/${pkMachine}`
  public getMachine(pkMachine: number): Observable<iMachine> {
    return null;
  }

  // POST `api/machines`
  public addMachine(newMachine: iMachine): void {
    return;
  }

  // PUT `api/machines/${updatedMachine.PkMachine}`
  public updateMachine(updatedMachine: iMachine): void {
    return;
  }

  // DELETE `api/machines/${pkToDelete}`
  public deleteMachine(pkToDelete: number): void {
    return;
  }
}
