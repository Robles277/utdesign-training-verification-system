package com.project.DatabaseAPI.Entities;

import java.util.Date;
import java.time.Duration;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "UseRecord")
@EntityListeners(AuditingEntityListener.class)
public class UseRecord {

	private int useRecordPk; // auto-increment

	private int studentFk;
	private int machineFk;

	private Date dateOfSignIn;
	private Date dateOfSignOut;
	private Duration sessionLength; // virtual attribute in database

	public UseRecord() {
	}

	public UseRecord(Date dateOfSignIn, Date dateOfSignOut, Duration sessionLength, int studentFk, int machineFk) {
		this.dateOfSignIn = dateOfSignIn;
		this.dateOfSignOut = dateOfSignOut;
		this.sessionLength = sessionLength;
		this.studentFk = studentFk;
		this.machineFk = machineFk;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getUseRecordPk() { return useRecordPk; }
	public void setUseRecordPk(int useRecordPk) { this.useRecordPk = useRecordPk; }

	public int getStudentFk() { return studentFk; }
	public void setStudentFk(int studentFk) { this.studentFk = studentFk; }

	public int getMachineFk() { return machineFk; }
	public void setMachineFk(int machineFk) { this.machineFk = machineFk; }

	public Date getDateOfSignIn() { return dateOfSignIn; }
	public void setDateOfSignIn(Date dateOfSignIn) { this.dateOfSignIn = dateOfSignIn; }

	public Date getDateOfSignOut() { return dateOfSignOut; }
	public void setDateOfSignOut(Date dateOfSignOut) { this.dateOfSignOut = dateOfSignOut; }

	public Duration getSessionLength() { return sessionLength; }
	public void setSessionLength(Duration sessionLength) { this.sessionLength = sessionLength; }
}
