import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbDateStruct, NgbTimeStruct, NgbDatepicker, NgbTimepicker } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs/operators";
import { iAppointment } from "src/app/interfaces";
import { AppointmentService } from "src/app/services/appointment.service";
import { Helpers } from "src/helpers";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-edit-appointment-modal',
  templateUrl: './add-edit-appointment-modal.component.html',
  styleUrls: ['./add-edit-appointment-modal.component.scss']
})

export class AddEditAppointmentModalComponent implements OnInit {
  @Input() appointment!: iAppointment;
  @Input() editMode!: boolean;
  public formAppointment!: FormGroup;
  public startTime!: NgbTimeStruct;
  public endTime!: NgbTimeStruct;

  constructor(
    private appointmentService: AppointmentService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
    if (!this.editMode) {
      this.appointment = {
        organizer: "",
        startTime: new Date(),
        endTime: new Date(),
      }
    }
    this.startTime = this.toNgbTime(new Date(this.appointment.startTime));
    this.endTime = this.toNgbTime(new Date(this.appointment.endTime));

    this.formAppointment = this.formBuilder.group({
      appointmentOrganizer: [this.appointment.organizer, [Validators.required, Helpers.validateStringIsNotEmpty()]],
      appointmentStartDate: [this.toNgbDate(new Date(this.appointment.startTime)), [Validators.required, Helpers.validateDate]],
      appointmentStartTime: [this.startTime, [Validators.required]],
      appointmentEndTime: [this.endTime, [Validators.required]],
    });
  }

  onClickSubmitButton(target: EventTarget | null) {
    this.editMode ? this.updateAppointment(target)
      : this.createAppointment(target);
  }

  updateAppointment(target: EventTarget | null) {
    let updatedAppointment = this.buildAppointment();
    updatedAppointment.idAppointment = this.appointment.idAppointment;

    let button = <HTMLButtonElement>target;
    button.disabled = true;
    this.appointmentService.updateAppointment(updatedAppointment).pipe(
      finalize(() => {
        button.disabled = false;
      }))
      .subscribe(
        (result: boolean) => {
          if (result) {
            Helpers.individualKeyCopy(updatedAppointment, this.appointment);
            // display a success message somewhere, can we get like a toast module
            this.activeModal.close();
            return;
          }
        },
        error => {
          console.error("Unable to update appointment!: ", error);
        }
      );
  }

  createAppointment(target: EventTarget | null) {
    let newAppointment = this.buildAppointment();

    let button = <HTMLButtonElement>target;
    button.disabled = true;
    this.appointmentService.addAppointment(newAppointment).pipe(
      finalize(() => {
        button.disabled = false;
      }))
      .subscribe(
        (result: boolean) => {
          if (result) {
            // display a success message somewhere, can we get like a toast module
            this.activeModal.close({object: newAppointment});
            return;
          }
        },
        error => {
          console.error("Unable to create appointment!: ", error);
        }
      );
  }

  buildAppointment(): iAppointment {
    let startDate: NgbDateStruct = this.formAppointment.get("appointmentStartDate")!.value;
    let startTime: NgbTimeStruct = this.startTime;
    let endTime: NgbTimeStruct = this.endTime;

    let convertedStartTime: Date = this.createDateTime(startDate, startTime);
    let convertedEndTime: Date = this.createDateTime(startDate, endTime);
    let appointment: iAppointment = {
      organizer: this.formAppointment.get("appointmentOrganizer")!.value.trim(),
      startTime: convertedStartTime,
      endTime: convertedEndTime
    };
    console.log(appointment);
    return appointment;
  }

  createDateTime(startDate: NgbDateStruct, startTime: NgbTimeStruct): Date {
    if (startDate && startTime) {
      // zero-indexed months, for whatever reason
      return new Date(startDate.year, startDate.month-1, startDate.day,
        startTime.hour, startTime.minute, startTime.second)
    }
    return new Date();
  }

  toNgbTime(date: Date): NgbTimeStruct {
    let time: NgbTimeStruct = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    }
    return time;
  }

  toNgbDate(date: Date): NgbDateStruct {
    let convertDate: NgbDateStruct = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDay()
    }
    return convertDate;
  }

}
