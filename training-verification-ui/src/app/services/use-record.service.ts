import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iUseRecord } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UseRecordService {

  constructor(
    private http: HttpClient
  ) {
  }

  // GET `api/use-records`
  public getAllUseRecords(): Observable<iUseRecord[]> {
    return null;
  }

  // GET `api/use-records/${pkUseRecord}`
  public getUseRecord(pkUseRecord: number): Observable<iUseRecord> {
    return null;
  }

  // POST `api/use-records`
  public addUseRecord(newUseRecord: iUseRecord): void {
    return;
  }

  // PUT `api/use-records/${updatedUseRecord.PkUseRecord}`
  public updateUseRecord(updatedUseRecord: iUseRecord): void {
    return;
  }

  // DELETE `api/use-records/${pkToDelete}`
  public deleteUseRecord(pkToDelete: number): void {
    return;
  }
}
