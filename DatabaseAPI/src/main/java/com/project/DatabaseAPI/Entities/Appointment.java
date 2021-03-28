package com.project.DatabaseAPI.Entities;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.time.Duration;

@Entity
@Table(name = "appointment")
@EntityListeners(AuditingEntityListener.class)
public class Appointment {

	private int appointmentPk; // auto-increment

	private String organizer;
	private Date startTime;
	private Date endTime;
	private Duration duration; // virtual attribute in database

	public Appointment() {
	}

	public Appointment(String organizer, Date startTime, Date endTime, Duration duration) {
		this.organizer = organizer;
		this.start_time = startTime;
		this.end_time = endTime;
		this.duration = duration;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getAppointmentPk() { return appointmentPk; }
	public void setAppointmentPk(int appointmentPk) { this.appointmentPk = appointmentPk; }

	public String getOrganizer() { return organizer; }
	public void setOrganizer(String organizer) { this.organizer = organizer; }

	public Date getStartTime() { return startTime; }
	public void setStartTime(Date startTime) { this.startTime = startTime; }

	public Date getEndTime() { return endTime; }
	public void setEndTime(Date endTime) { this.endTime = endTime; }

	public Duration getDuration() { return duration; }
	public void setDuration(Duration duration) { this.duration = duration; }
}
