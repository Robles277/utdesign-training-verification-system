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

import com.project.DatabaseAPI.Repositories.MachineRepository;
import com.project.DatabaseAPI.Services.MachineService;
import com.project.DatabaseAPI.Entities.*;

@RestController
@RequestMapping(path = "/machine-api")
public class MachineController {

  @Autowired
  private MachineRepository machineRepository; // do we need this in the controller?


  @Autowired
  private MachineService machineService;

  @GetMapping(path="/machines")
  public List<Machine> listMachines() {
	  return machineService.getAllMachines();
  }

  @GetMapping("/machines/{id}")
  public ResponseEntity<Machine> getMachine(@PathVariable int id) {
	  try {
		  Machine machine =  machineService.getMachine(id);
		  return new ResponseEntity<Machine>(machine, HttpStatus.OK);
	  }
	  catch(NoSuchElementException e) {
		  return new ResponseEntity<Machine>(HttpStatus.NOT_FOUND);
	  }
  }

  @PostMapping("/machines")
  public void addStudent(@RequestBody Machine machine) {
	  machineService.addMachine(machine);
  }

  @PutMapping("/machines/{id}")
  public ResponseEntity<?> updateStudent(@RequestBody Machine machine,
		  					@PathVariable Integer id) {
	  try {
		  machineService.updateMachine(id, machine);
		  return new ResponseEntity<>(HttpStatus.OK);
	  }
	  catch (NoSuchElementException e) {
		  return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  }
  }

  @DeleteMapping("/machines/{id}")
  public void deleteStudent(@PathVariable Integer id) {
      machineService.deleteMachine(id);
  }
}
