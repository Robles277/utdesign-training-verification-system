package com.project.DatabaseAPI.Entities;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "appointment")
@EntityListeners(AuditingEntityListener.class)
public class Appointment {

	private int appointmentPk; // auto-increment
	
	private String organizer;
	private java.util.Date start_time;
	private java.util.Date end_time;
	private java.time.Duration duration; //virtual attribute in database

	public Appointment() {	
	}
	
	public Appointment(String organizer, java.util.Date startTime, java.util.Date endTime, java.time.Duration duration) {
		this.organizer = organizer;
		this.start_time = startTime;
		this.end_time = endTime;
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
		return start_time;
	}

	public void setStartTime(java.util.Date startTime) {
		this.start_time = startTime;
	}

	public java.util.Date getEndTime() {
		return end_time;
	}

	public void setEndTime(java.util.Date endTime) {
		this.end_time = endTime;
	}
	
	public void setDuration(java.time.Duration duration) {
		this.duration = duration;
	}
	
	public java.time.Duration getDuration() {
		return duration;
	}
}
