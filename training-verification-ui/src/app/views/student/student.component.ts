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

  showBad() {  
    alert("ERROR: You are a bad guy.");  
   }
   showGood() {  
    alert("You are allowed into the lab.");  
   }

}
