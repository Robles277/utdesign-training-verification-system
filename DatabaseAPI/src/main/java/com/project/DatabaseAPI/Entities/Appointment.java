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
@Table(name = "appointment")
@EntityListeners(AuditingEntityListener.class)
public class Appointment {

	private int appointment_pk; // auto-increment

	private String organizer;
	private Date start_time;
	private Date end_time;
	@Column(name="session_length", nullable=true, insertable=false, updatable=false)
	private int duration; // virtual attribute in database

	public Appointment() {
	}

	public Appointment(String organizer, Date startTime, Date endTime, int duration) {
		this.organizer = organizer;
		this.start_time = startTime;
		this.end_time = endTime;
		this.duration = duration;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getIdAppointment() { return appointment_pk; }
	public void setIdAppointment(int appointmentPk) { this.appointment_pk = appointmentPk; }

	public String getOrganizer() { return organizer; }
	public void setOrganizer(String organizer) { this.organizer = organizer; }

	public Date getStartTime() { return start_time; }
	public void setStartTime(Date startTime) { this.start_time = startTime; }

	public Date getEndTime() { return end_time; }
	public void setEndTime(Date endTime) { this.end_time = endTime; }
	
	@Formula(value = "minute_diff(start_time, end_time)")
	public int getDuration() { return duration; }
	public void setDuration(int duration) { this.duration = duration; }
}
