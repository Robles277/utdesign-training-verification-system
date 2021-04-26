import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs/operators";
import { iMachine } from "src/app/interfaces";
import { MachineService } from "src/app/services/machine.service";

@Component({
  selector: 'app-delete-machine-modal',
  templateUrl: './delete-machine-modal.component.html',
  styleUrls: ['./delete-machine-modal.component.scss']
})

export class DeleteMachineModalComponent {
  @Input() machine!: iMachine;

  constructor(
    private machineService: MachineService,
    public activeModal: NgbActiveModal
  ) {

  }

  onClickSubmitButton(target: EventTarget | null) {
    let button = <HTMLButtonElement>target;
    button.disabled = true;
    this.machineService.deleteMachine(this.machine.machinePk!).pipe(
      finalize(() => {
        button.disabled = false;
      }))
      .subscribe(
        (result: boolean) => {
          if (result) {
            // display a success message somewhere, can we get like a toast module
            this.activeModal.close({success: true, itemPk: this.machine.machinePk!});
            return;
          }
        },
        error => {
          console.error("Unable to delete machine!: ", error);
        }
      );
  }

}
