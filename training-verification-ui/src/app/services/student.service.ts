import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iMachine, iStudent } from '../interfaces';
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

  public getStudent(netIdStudent: string): Observable<iStudent> {
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

  public addStudent(newStudent: iStudent): Observable<number> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.post<number>(`api/students`, newStudent, options).pipe(
      map(
        (result: number) => {
          return result;
        },
        (error: any) => {
          console.error("Failed to add student", error);
          return 0;
        }
      ));
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

  public uploadCSV(file: any): Observable<any> {
    return this.http.put('api/students/upload', file);
  }

  public loginStudentToMachines(student: iStudent, machineList: iMachine[]): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.post<boolean>(`api/use-records/${student.studentPk}/login`, machineList, options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to login student", error);
          return false;
        }
      ));
  }

  public logoutStudentFromMachines(student: iStudent): Observable<boolean> {
    // this is not RESTful, by the way
    let httpHeaders = new HttpHeaders()
      .set('Cache-Control', 'no-cache');
    let options = {headers: httpHeaders};

    return this.http.post<boolean>(`api/use-records/${student.studentPk}/logout`, "", options).pipe(
      map(
        () => {
          return true;
        },
        (error: any) => {
          console.error("Failed to login student", error);
          return false;
        }
      ));
  }

}
