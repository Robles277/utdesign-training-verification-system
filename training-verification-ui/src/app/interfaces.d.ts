import { TrainingLevel } from './enums';
import { Duration } from '@js-joda/core'; // https://js-joda.github.io/js-joda/manual/Duration.html

export interface iStudent {
  studentPk?: number;
  studentId: string;
  netId: string;
  firstName: string;
  lastName: string;
  trainingLevel: number;
}

export interface iMachine {
  machinePk?: number;
  machineTag: string;
  machineName: string;
}

export interface iUseRecord {
  useRecordPk?: number;
  dateOfSignIn?: Date;
  dateOfSignOut?: Date;
  sessionLength?: Duration;
  studentStudentPk: number;
  machineMachinePk: number;
}

export interface iAppointment {
  idAppointment?: number;
  organizer: string;
  startTime: Date;
  endTime: Date;
  duration?: Duration;
}
