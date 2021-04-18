import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { iStudent } from "src/app/interfaces";
import { StudentService } from "src/app/services/student.service"; 

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() student!: iStudent;
  
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
