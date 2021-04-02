import { TrainingLevel } from './enums';
import { Duration } from '@js-joda/core'; // https://js-joda.github.io/js-joda/manual/Duration.html

export interface iStudent {
  PkStudent: number;
  StudentId: string;
  NetId: string;
  FirstName: string;
  LastName: string;
  TrainingLevel: TrainingLevel; // this might not work with how Java handles enums
}

export interface iMachine {
  PkMachine: number;
  MachineTag: string;
  MachineName: string;
}

export interface iUseRecord {
  PkUseRecord: number;
  DateOfSignIn?: Date;
  DateOfSignOut?: Date;
  SessionLength?: Duration;
  FkStudent: number;
  FkMachine: number;
}

export interface iAppointment {
  PkAppointment: number;
  Organizer: string;
  StartTime: Date;
  EndTime: Date;
  Duration?: Duration;
}
