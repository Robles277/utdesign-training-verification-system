package com.project.DatabaseAPI;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "Appointment")
@EntityListeners(AuditingEntityListener.class)
public class Appointment {

	private int appointmentPk; // auto-increment
	
	private String organizer;
	private java.util.Date startTime;
	private java.util.Date endTime;
	private java.time.Duration duration; //virtual attribute in database

	public Appointment() {	
	}
	
	public Appointment(String organizer, java.util.Date startTime, java.util.Date endTime, java.time.Duration duration) {
		this.organizer = organizer;
		this.startTime = startTime;
		this.endTime = endTime;
		this.duration = duration;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getAppointmentPk() {
		return appointmentPk;
	}

	public void setAppointmentPk(int appointmentPk) {
		this.appointmentPk = appointmentPk;
	}
	
	public void setOrganizer(String organizer) {
		this.organizer = organizer;
	}

	public String getOrganizer() {
		return organizer;
	}
	public java.util.Date getStartTime() {
		return startTime;
	}

	public void setStartTime(java.util.Date startTime) {
		this.startTime = startTime;
	}

	public java.util.Date getEndTime() {
		return endTime;
	}

	public void setEndTime(java.util.Date endTime) {
		this.endTime = endTime;
	}
	
	public void setDuration(java.time.Duration duration) {
		this.duration = duration;
	}
	
	public java.time.Duration getDuration() {
		return duration;
	}
}
