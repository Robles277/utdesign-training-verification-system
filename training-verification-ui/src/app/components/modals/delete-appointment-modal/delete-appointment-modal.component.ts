import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs/operators";
import { iAppointment } from "src/app/interfaces";
import { AppointmentService } from "src/app/services/appointment.service";
import { NotificationService } from "src/app/services/notification.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-delete-appointment-modal',
  templateUrl: './delete-appointment-modal.component.html',
  styleUrls: ['./delete-appointment-modal.component.scss']
})

export class DeleteAppointmentModalComponent {
  @Input() appointment!: iAppointment;

  constructor(
    private appointmentService: AppointmentService,
    private notifyService: NotificationService,
    public activeModal: NgbActiveModal
  ) {

  }

  onClickSubmitButton(target: EventTarget | null) {
    let button = <HTMLButtonElement>target;
    button.disabled = true;
    this.appointmentService.deleteAppointment(this.appointment.idAppointment!).pipe(
      finalize(() => {
        button.disabled = false;
      }))
      .subscribe(
        (result: boolean) => {
          if (result) {
            this.activeModal.close({success: true, itemPk: this.appointment.idAppointment!});
            this.notifyService.showSuccess("Appointment deleted successfully!");
            return;
          }
        },
        error => {
          console.error("Unable to delete appointment!: ", error);
          this.notifyService.showError(`Unable to delete appointment!: ${error}`, "ERROR");
        }
      );
  }


}
