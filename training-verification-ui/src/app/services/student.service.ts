import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iStudent } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StudentService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getAllStudents(): Observable<iStudent[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.get<iStudent[]>(`api/students`, options).pipe(
      map(
      (results: iStudent[]) => {
        return results;
      },
      (error: any) => {
        console.error("Failed to fetch students", error);
        return null;
      }
    ));
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

  // PUT `api/students/${updatedStudent.student_pk}`
  public updateStudent(updatedStudent: iStudent): void {
    return;
  }

  // DELETE `api/students/${pkToDelete}`
  public deleteStudent(pkToDelete: number): void {
    return;
  }

}
