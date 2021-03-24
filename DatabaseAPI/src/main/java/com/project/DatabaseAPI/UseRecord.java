package com.project.DatabaseAPI;

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
	
	private Student student; // unsure if this is the way foreign keys should be represented
	private Machine machine;
	
    private java.util.Date dateOfSignIn; //java.util.date okay?
    private java.util.Date dateOfSignOut;
    private java.time.Duration sessionLength; //virtual attribute in database

	public UseRecord() {	
	}
	
	public UseRecord(java.sql.Date dateOfSignIn, java.sql.Date dateOfSignOut, java.time.Duration sessionLength, Student student, Machine machine) {
		this.dateOfSignIn = dateOfSignIn;
		this.dateOfSignOut = dateOfSignOut;
		this.sessionLength = sessionLength;
		this.student = student;
		this.machine = machine;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getUseRecordPk() {
		return useRecordPk;
	}

	public void setUseRecordPk(int useRecordPk) {
		this.useRecordPk = useRecordPk;
	}
	
	public Student getStudent() {
		return student;
	}
	
	public void setStudent(Student student) {
		this.student = student;
	}
	
	public void setMachine(Machine machine) {
		this.machine = machine;
	}
	
	public Machine getMachine(Machine machine) {
		return machine;
	}
	
	public void setDateOfSignIn(java.util.Date dateOfSignIn) {
		this.dateOfSignIn = dateOfSignIn;
	}

	public java.util.Date getDateOfSignIn() {
		return dateOfSignIn;
	}
	public java.util.Date getDateOfSignOut() {
		return dateOfSignOut;
	}

	public void setDateOfSignOut(java.util.Date dateOfSignOut) {
		this.dateOfSignOut = dateOfSignOut;
	}
	
	public void setSessionLength(java.time.Duration sessionLength) {
		this.sessionLength = sessionLength;
	}
	
	public java.time.Duration getSessionLength() {
		return sessionLength;
	}
	

}