package com.project.DatabaseAPI.Controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.DatabaseAPI.Repositories.AppointmentRepository;
import com.project.DatabaseAPI.Services.AppointmentService;
import com.project.DatabaseAPI.Entities.*;

@RestController
@RequestMapping(path = "/api")
public class AppointmentController {

  @Autowired
  private AppointmentRepository appointmentRepository; // do we need this in the controller?


  @Autowired
  private AppointmentService appointmentService;

  @GetMapping(path="/appointments")
  public List<Appointment> listAppointment() {
	  return appointmentService.getAllAppointments();
  }

  @GetMapping("/appointments/{id}")
  public ResponseEntity<Appointment> getMachine(@PathVariable int id) {
	  try {
		  Appointment appointment =  appointmentService.getAppointment(id);
		  return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
	  }
	  catch(NoSuchElementException e) {
		  return new ResponseEntity<Appointment>(HttpStatus.NOT_FOUND);
	  }
  }

  @PostMapping("/appointments")
  public void addStudent(@RequestBody Appointment appointment) {
	  appointmentService.addAppointment(appointment);
  }

  @PutMapping("/appointments/{id}")
  public ResponseEntity<?> updateStudent(@RequestBody Appointment appointment,
		  					@PathVariable Integer id) {
	  try {
		  appointmentService.updateAppointment(id, appointment);
		  return new ResponseEntity<>(HttpStatus.OK);
	  }
	  catch (NoSuchElementException e) {
		  return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  }
  }

  @DeleteMapping("/appointments/{id}")
  public void deleteStudent(@PathVariable Integer id) {
	  appointmentService.deleteAppointment(id);
  }
}
