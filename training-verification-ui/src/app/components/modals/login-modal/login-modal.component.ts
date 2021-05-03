import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { iStudent } from "src/app/interfaces";
import { iMachine } from "src/app/interfaces";
import { MachineService } from "src/app/services/machine.service";
import { NotificationService } from "src/app/services/notification.service";

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
    private notifyService: NotificationService,
    private machineService: MachineService
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.machineService.getAllMachines().toPromise(),
    ]).then((results) => {
      this.machines = results[0];
    });
  }

  getSelectedMachines(): iMachine[] {
    // this is quite literally the least angular way to do this
    // but I don't have time to make a dynamic form
    let selectedMachines: iMachine[] = [];
    let elementList = document.getElementsByName("checkbox[]");
    elementList.forEach(element => {
      let input = <HTMLInputElement>element;
      if (input.checked && input.value) {
        let valPk: number = Number.parseInt(input.value);
        let owningMachine: any = this.machines.find(m => m.machinePk === valPk);
        selectedMachines.push(owningMachine);
      }
    });
    return selectedMachines;
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  closeModalSubmit() {
    let selectedMachines = this.getSelectedMachines();
    if (selectedMachines.length === 0) {
      this.notifyService.showError("Please select one or more machines.", "");
      return;
    }
    this.notifyService.showSuccess("You have been logged in!");
    this.activeModal.close({objectList: selectedMachines});
  }
}
