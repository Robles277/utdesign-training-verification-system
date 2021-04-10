import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEventPattern } from 'rxjs';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  

  loginForm = this.formBuilder.group({
    netID: ''
  });

  constructor(private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() : void {
    // this.loginForm=this.formBuilder.group({
    //   netID: ['', [Validators.required]]
    // });
  }

  onSubmit() : void
  {
    alert(JSON.stringify(this.loginForm.value));
    this.loginForm.reset();
  }
  
  showUnknown() {  
    alert("ERROR: No record of your netID exists in the current database. Please check your spelling or contact a staff member for assistance.");  
   }
   showGood() {  
    alert("You are allowed into the lab.");  
   }
}
