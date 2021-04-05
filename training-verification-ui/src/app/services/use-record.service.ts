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

  public getAllUseRecords(): Observable<iUseRecord[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.get<iUseRecord[]>(`api/use-records`, options).pipe(
      map(
      (results: iUseRecord[]) => {
        return results;
      },
      (error: any) => {
        console.error("Failed to fetch use records", error);
        return null;
      }
    ));
  }

  public getUseRecord(pkUseRecord: number): Observable<iUseRecord> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.get<iUseRecord>(`api/use-records/${pkUseRecord}`, options).pipe(
      map(
      (result: iUseRecord) => {
        return result;
      },
      (error: any) => {
        console.error(`Failed to fetch use record of pk ${pkUseRecord}`, error);
        return null;
      }
    ));
  }

  // POST `api/use-records`
  public addUseRecord(newUseRecord: iUseRecord): void {
    return;
  }

  // PUT `api/use-records/${updatedUseRecord.useRecordPk}`
  public updateUseRecord(updatedUseRecord: iUseRecord): void {
    return;
  }

  // DELETE `api/use-records/${pkToDelete}`
  public deleteUseRecord(pkToDelete: number): void {
    return;
  }
}
