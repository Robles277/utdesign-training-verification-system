package com.project.DatabaseAPI.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;

@Entity
@Table(name = "student")
@EntityListeners(AuditingEntityListener.class)
public class Student {

	private String first_name;

	private String last_name;

	private String net_id;
	
	private String identifier;

	private String student_id;

	private int student_pk;

	private short training_level = 0;

	/*
	public enum TrainingLevel {
		UNTRAINED, TRAINING, TRAINED
	}
	The way Java handles enums for use with database persistence is abysmal.
	*/

	public Student() {
	}

	public Student(String studentId, String netId, String firstName, String lastName, short trainingLevel, String identifier) {
		this.student_id = studentId;
		this.net_id = netId;
		this.first_name = firstName;
		this.last_name = lastName;
		this.training_level = trainingLevel;
		this.identifier = identifier;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getStudentPk() { return student_pk; }
	public void setStudentPk(int studentPk) { this.student_pk = studentPk; }

	public String getStudentId() { return student_id; }
	public void setStudentId(String studentId) { this.student_id = studentId; }

	public String getFirstName() { return first_name; }
	public void setFirstName(String firstName) { this.first_name = firstName; }

	public String getLastName() { return last_name; }
	public void setLastName(String lastName) { this.last_name = lastName; }

	public String getNetId() { return net_id; }
	public void setNetId(String net_id) { this.net_id = net_id;}

	public short getTrainingLevel() { return training_level; }
	public void setTrainingLevel(short trainingLevel) { this.training_level = trainingLevel; }
	
	public String getIdentifier() { return identifier; }
    public void setIdentifier(String identifier) { this.identifier = identifier; }
}
