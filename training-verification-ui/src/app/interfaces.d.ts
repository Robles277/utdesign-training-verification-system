
export interface iStudent {
  studentPk?: number;
  studentId: string;
  netId: string;
  firstName: string;
  lastName: string;
  identifier?: string;
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
  sessionLength?: number;
  studentStudentPk: number;
  machineMachinePk: number;
}

export interface iAppointment {
  idAppointment?: number;
  organizer: string;
  startTime: Date;
  endTime: Date;
  duration?: number;
}
