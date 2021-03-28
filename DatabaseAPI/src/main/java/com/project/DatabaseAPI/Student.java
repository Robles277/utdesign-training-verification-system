package com.project.DatabaseAPI;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "Student")
@EntityListeners(AuditingEntityListener.class)
public class Student {

	private int studentPk; // auto-increment

	private String studentId;
	private String netId;
	private String firstName;
	private String lastName;
	private short trainingLevel = 0; // default no training

	/*
	public enum TrainingLevel {
		UNTRAINED, TRAINING, TRAINED
	}
	The way Java handles enums for use with database persistence is abysmal.
	*/

	public Student() {
	}

	public Student(String studentId, String netId, String firstName, String lastName, short trainingLevel) {
		this.studentId = studentId;
		this.netId = netId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.trainingLevel = trainingLevel;
	}



	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getStudentPk() { return studentPk; }
	public void setStudentPk(int studentPk) { this.studentPk = studentPk; }

	public String getStudentId() { return studentId; }
	public void setStudentId(String studentId) { this.studentId = studentId; }

	public String getFirstName() { return firstName; }
	public void setFirstName(String firstName) { this.firstName = firstName; }

	public String getLastName() { return lastName; }
	public void setLastName(String lastName) { this.lastName = lastName; }

	public String getNetId() { return netId; }
	public void setNetID(String netId) { this.netId = netId; }

	public short getTrainingLevel() { return trainingLevel; }
	public void setTrainingLevel(short trainingLevel) { this.trainingLevel = trainingLevel; }
}
