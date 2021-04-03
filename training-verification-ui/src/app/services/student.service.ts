import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iStudent } from '../interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class StudentService {
  constructor(
    private http: HttpClient
  ) {
  }
   private requestUrl = environment.fabricationShopAPIRoot + '/students';


  public getAllStudents(): Observable<Object> {
    return this.http.get(this.requestUrl)
  }

  public getStudent(pkStudent: number): Observable<iStudent> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.get<iStudent>(`api/students/${pkStudent}`, options).pipe(
      map(
      (result: iStudent) => {
        return result;
      },
      (error: any) => {
        console.error(`Failed to fetch student of pk ${pkStudent}`, error);
        return null;
      }
    ));
  }

  // POST `api/students`
  public addStudent(newStudent: iStudent): void {
    return;
  }

  // PUT `api/students/${updatedStudent.PkStudent}`
  public updateStudent(updatedStudent: iStudent): void {
    return;
  }

  // DELETE `api/students/${pkToDelete}`
  public deleteStudent(pkToDelete: number): void {
    return;
  }

}
