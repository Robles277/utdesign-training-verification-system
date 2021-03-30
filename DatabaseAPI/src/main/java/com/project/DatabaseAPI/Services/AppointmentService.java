package com.project.DatabaseAPI.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.DatabaseAPI.Repositories.AppointmentRepository;
import com.project.DatabaseAPI.Entities.*;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;

	public List<Appointment> getAllAppointments() {
		return appointmentRepository.findAll();
	}

  public Appointment getAppointment(Integer id) {
    return appointmentRepository.findById(id).get();
  }

	public void addAppointment(Appointment appointment) {
		appointmentRepository.save(appointment);
	}

  public void updateAppointment(Integer id, Appointment updatedAppointment) {
    Appointment existingAppointment = getAppointment(id);
    if (existingAppointment != null) {
    	appointmentRepository.save(updatedAppointment);
    }
  }

	public void deleteAppointment(Integer id) {
		appointmentRepository.deleteById(id);
	}
}
