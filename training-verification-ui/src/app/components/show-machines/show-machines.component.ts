import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { iMachine } from '../../interfaces';

@Component({
  selector: 'app-show-machines',
  templateUrl: './show-machines.component.html',
  styleUrls: ['./show-machines.component.css']
})
export class ShowMachinesComponent implements OnInit {

  machines: iMachine[] = [];
  currentDate: Date = new Date();

  constructor(
    private machineService: MachineService
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.machineService.getAllMachines().toPromise(),
    ]).then((results) => {
      this.machines = results[0];
    });
  }
  
}
