package com.project.DatabaseAPI.Entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "use_record")
@EntityListeners(AuditingEntityListener.class)
public class UseRecord {

	private int use_record_pk; // auto-increment

	private int student_student_pk;

	private int machine_machine_pk;

	private Date date_of_sign_in;

	private Date date_of_sign_out;
	
	@Column(name="session_length", nullable=true, insertable=false, updatable=false)
	private int session_length; // virtual attribute in database

	public UseRecord() {
	}

	public UseRecord(Date date_of_sign_in, Date date_of_sign_out, int session_length, int student_student_pk, int machine_machine_pk) {
		this.date_of_sign_in = date_of_sign_in;
		this.date_of_sign_out = date_of_sign_out;
		this.session_length = session_length;
		this.student_student_pk = student_student_pk;
		this.machine_machine_pk = machine_machine_pk;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getUseRecordPk() { return use_record_pk; }
	public void setUseRecordPk(int use_record_pk) { this.use_record_pk = use_record_pk; }

	public int getStudentStudentPk() { return student_student_pk; }
	public void setStudentStudentPk(int student_student_pk) { this.student_student_pk = student_student_pk; }

	public int getMachineMachinePk() { return machine_machine_pk; }
	public void setMachineMachinePk(int machine_machine_pk) { this.machine_machine_pk = machine_machine_pk; }

	public Date getDateOfSignIn() { return date_of_sign_in; }
	public void setDateOfSignIn(Date date_of_sign_in) { this.date_of_sign_in = date_of_sign_in; }

	public Date getDateOfSignOut() { return date_of_sign_out; }
	public void setDateOfSignOut(Date date_of_sign_out) { this.date_of_sign_out = date_of_sign_out; }
	
	@Formula(value = "minute_diff(date_of_sign_in, date_of_sign_out)")
	public int getSessionLength() { return session_length; }
	public void setSessionLength(int session_length) { this.session_length = session_length; }
}
