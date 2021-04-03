import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service'
import { iStudent } from 'src/app/interfaces';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  
  public students: iStudent[]

  constructor(
    private studentService: StudentService,

    ) {}
    

  ngOnInit(): void {
  }
  async getAllStudents() {
    this.studentService.getAllStudents().subscribe((student: iStudent[]) => {
      this.students = student  
    })
}

}