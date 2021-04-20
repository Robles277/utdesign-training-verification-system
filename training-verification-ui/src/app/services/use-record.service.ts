import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iUseRecord } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
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

  public addUseRecord(newUseRecord: iUseRecord): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.post(`api/use-records`, newUseRecord, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to add use record", error);
          return false;
        }
      ));
  }

  public updateUseRecord(updatedUseRecord: iUseRecord): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.put(`api/use-records/${updatedUseRecord.useRecordPk}`, updatedUseRecord, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to update use record", error);
          return false;
        }
      ));
  }

  public deleteUseRecord(pkToDelete: number): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.delete(`api/use-records/${pkToDelete}`, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to delete use record", error);
          return false;
        }
      ));
  }
  public getTextFile(url: string): Observable<string> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'text/csv')
      .set('Cache-Control', 'no-cache');

    return this.http.get(url, {headers: httpHeaders, responseType: 'text', observe: 'body'});
  }
  
}
