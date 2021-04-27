import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs/operators";
import { iMachine } from "src/app/interfaces";
import { MachineService } from "src/app/services/machine.service";
import { NotificationService } from 'src/app/services/notification.service'
import { Helpers } from "src/helpers";

@Component({
  selector: 'app-add-edit-machine-modal',
  templateUrl: './add-edit-machine-modal.component.html',
  styleUrls: ['./add-edit-machine-modal.component.scss']
})

export class AddEditMachineModalComponent implements OnInit {
  @Input() machine!: iMachine;
  @Input() editMode!: boolean;

  public formMachine!: FormGroup;

  constructor(
    private machineService: MachineService,
    private notifyService: NotificationService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
    if (!this.editMode) {
      this.machine = {
        machineTag: "",
        machineName: "",
      }
    }

    this.formMachine = this.formBuilder.group({
      machineTag: [this.machine.machineTag, [Validators.required, Helpers.validateStringIsNotEmpty()]],
      machineName: [this.machine.machineName, [Validators.required, Helpers.validateStringIsNotEmpty()]]
    });
  }

  onClickSubmitButton(target: EventTarget | null) {
    this.editMode ? this.updateMachine(target)
      : this.createMachine(target);
  }

  updateMachine(target: EventTarget | null) {
    let updatedMachine = this.buildMachine();
    updatedMachine.machinePk = this.machine.machinePk;

    let button = <HTMLButtonElement>target;
    button.disabled = true;
    this.machineService.updateMachine(updatedMachine).pipe(
      finalize(() => {
        button.disabled = false;
      }))
      .subscribe(
        (result: boolean) => {
          if (result) {
            Helpers.individualKeyCopy(updatedMachine, this.machine);
            this.activeModal.close();
            this.notifyService.showSuccess("Machine edited successfully!");
            return;
          }
        },
        error => {
          console.error("Unable to update machine!: ", error);
          this.notifyService.showError(`Unable to update machine!: ${error}`, "ERROR");
        }
      );
  }

  createMachine(target: EventTarget | null) {
    let newMachine = this.buildMachine();

    let button = <HTMLButtonElement>target;
    button.disabled = true;
    this.machineService.addMachine(newMachine).pipe(
      finalize(() => {
        button.disabled = false;
      }))
      .subscribe(
        (result: boolean) => {
          if (result) {
            this.activeModal.close({object: newMachine});
            this.notifyService.showSuccess("Machine created successfully!");
            return;
          }
        },
        error => {
          console.error("Unable to create machine!: ", error);
          this.notifyService.showError(`Unable to create machine!: ${error}`, "ERROR");
        }
      );
  }

  buildMachine(): iMachine {
    let machine: iMachine = {
      machineName: this.formMachine.get("machineName")!.value.trim(),
      machineTag: this.formMachine.get("machineTag")!.value.trim(),
    };
    return machine;
  }
}
