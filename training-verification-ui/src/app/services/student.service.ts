import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iStudent } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
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

  public getStudent(netIdStudent: number): Observable<iStudent> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.get<iStudent>(`api/students/${netIdStudent}`, options).pipe(
      map(
      (result: iStudent) => {
        return result;
      },
      (error: any) => {
        console.error(`Failed to fetch student of pk ${netIdStudent}`, error);
        return null;
      }
    ));
  }

  public addStudent(newStudent: iStudent): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.post(`api/students`, newStudent, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to add student", error);
          return false;
        }
      ));
    /*
    Ideally, this and below functions (once "Results" type objects are added as
    interfaces and returned from API) would look like this:
    return this.http.post<ResultsInsert>(`api/students`, newStudent, options).pipe(
      .map(
        (results: ResultsInsert) => {
          if(result.success) {
            return result;
          }
        },
        error => {
          console.error("Failed to add student", error);
          throw new Error(error);
        }
      ));
    */
  }

  public updateStudent(updatedStudent: iStudent): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.put(`api/students/${updatedStudent.studentPk}`, updatedStudent, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to update student", error);
          return false;
        }
      ));
  }

  public deleteStudent(pkToDelete: number): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.delete(`api/students/${pkToDelete}`, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to delete student", error);
          return false;
        }
      ));
  }

}
