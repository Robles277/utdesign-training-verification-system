import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showUnknown() {  
    alert("ERROR: No record of your netID exists in the current database. Please check your spelling or contact a staff member for assistance.");  
   }
   showGood() {  
    alert("You are allowed into the lab.");  
   }
}
