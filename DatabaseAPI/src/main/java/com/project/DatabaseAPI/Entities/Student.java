package com.project.DatabaseAPI.Entities;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "student")
@EntityListeners(AuditingEntityListener.class)
public class Student{

	
	private String first_name;
	private String last_name;
	private String net_id;
	private String student_id;
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int studentPk; 
	
	private short training_level = 0; 

	public Student() {	
	}
	
	public Student(String studentId, String netId, String firstName, String lastName, short trainingLevel) {
		this.student_id = studentId;
		this.net_id = netId;
		this.first_name = firstName;
		this.last_name = lastName;
		this.training_level = trainingLevel;
	}

	
	
	
	public int getStudentPk() {
		return studentPk;
	}
		
	public void setStudentPk(int studentPk) {
		this.studentPk = studentPk;
	}
		
	public String getStudentId() {
		return student_id;
	}

	public void setStudentId(String studentId) {
		this.student_id = studentId;
	}
	public void setFirstName(String firstName) {
		this.first_name = firstName;
	}

	public String getFirstName() {
		return first_name;
	}

	public void setLastName(String lastName) {
		this.last_name = lastName;
	}

	public String getLastName() {
		return last_name;
	}
	
	public void setNetId(String netId) {
		this.net_id = netId;
	}

	public String getNetId() {
		return net_id;
	}

	public short getTrainingLevel() {
		return training_level;
	}

	public void setTrainingLevel(short trainingLevel) {
		this.training_level = trainingLevel;
	}
}
