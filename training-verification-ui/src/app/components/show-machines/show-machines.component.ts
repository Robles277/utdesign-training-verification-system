import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { iMachine } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditMachineModalComponent } from '../modals/add-edit-machine-modal/add-edit-machine-modal.component';
import { DeleteMachineModalComponent } from '../modals/delete-machine-modal/delete-machine-modal.component';

@Component({
  selector: 'app-show-machines',
  templateUrl: './show-machines.component.html',
  styleUrls: ['./show-machines.component.css']
})
export class ShowMachinesComponent implements OnInit {

  machines: iMachine[] = [];
  currentDate: Date = new Date();

  constructor(
    private machineService: MachineService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.machineService.getAllMachines().toPromise(),
    ]).then((results) => {
      this.machines = results[0];
    });
  }

  openAddMachineModal() {
    const modalRef = this.modalService.open(AddEditMachineModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.machine = null;
    modalRef.componentInstance.editMode = false;
    modalRef.result.then(result => {
      if (result) {
        this.machines.push(result.object);
      }
    });
  }

  openEditMachineModal(machine: iMachine) {
    const modalRef = this.modalService.open(AddEditMachineModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.machine = machine;
    modalRef.componentInstance.editMode = true;
  }

  openDeleteMachineModal(machine: iMachine) {
    const modalRef = this.modalService.open(DeleteMachineModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.machine = machine;
    modalRef.result.then(result => {
      if (result && result.success) {
        let index = -1;
        index = this.machines.findIndex(element => element.machinePk === result.itemPk);
        this.machines.splice(index, 1);
      }
    });
  }

}
