import { Component, Input } from "@angular/core";
//import { MachineService } from '../../services/machine.service';
//import { iMachine } from '../../interfaces';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { iStudent } from "src/app/interfaces";
import { iMachine } from "src/app/interfaces";
import { MachineService } from "src/app/services/machine.service";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() student!: iStudent;

  machines: iMachine[] = [];
  
  constructor(
    public activeModal: NgbActiveModal,
    private machineService: MachineService
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.machineService.getAllMachines().toPromise(),
    ]).then((results) => {
      this.machines = results[0];
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
