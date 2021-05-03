package com.project.DatabaseAPI.Controllers;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Time;

import com.opencsv.CSVWriter;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.server.ResponseStatusException;

import com.project.DatabaseAPI.Repositories.UseRecordRepository;
import com.project.DatabaseAPI.Services.MachineService;
import com.project.DatabaseAPI.Services.StudentService;
import com.project.DatabaseAPI.Services.UseRecordService;
import com.project.DatabaseAPI.Entities.*;



@RestController
@RequestMapping(path = "/api")
public class UseRecordController {

  @Autowired
  private UseRecordRepository appointmentRepository; // do we need this in the controller?


  @Autowired
  private UseRecordService useRecordService;
  
  @Autowired
  private MachineService machineService;

  @GetMapping(path="/use-records")
  public List<UseRecord> listUseRecords() {
	  return useRecordService.getAllUseRecords();
  }

  @GetMapping("/use-records/{id}")
  public ResponseEntity<UseRecord> getUseRecord(@PathVariable int id) {
	  try {
		  UseRecord useRecord =  useRecordService.getUseRecord(id);
		  return new ResponseEntity<UseRecord>(useRecord, HttpStatus.OK);
	  }
	  catch(NoSuchElementException e) {
		  return new ResponseEntity<UseRecord>(HttpStatus.NOT_FOUND);
	  }
  }

  @PostMapping("/use-records")
  public void addUseRecord(@RequestBody UseRecord useRecord) {
	  useRecordService.addUseRecord(useRecord);
  }

  @PutMapping("/use-records/{id}")
  public ResponseEntity<?> updateUseRecord(@RequestBody UseRecord useRecord,
		  					@PathVariable Integer id) {
	  try {
		  useRecordService.updateUseRecord(id, useRecord);
		  return new ResponseEntity<>(HttpStatus.OK);
	  }
	  catch (NoSuchElementException e) {
		  return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  }
  }

  @DeleteMapping("/use-records/{id}")
  public void deleteUseRecord(@PathVariable Integer id) {
	  useRecordService.deleteUseRecord(id);
  }
  
  
  
  @GetMapping(value = "/use-records/downloadCSV", produces = "text/csv")
  public ResponseEntity downloadCSV() throws IOException { 
	  
	  try {
		  String csvFileName = "log.csv";
		  File file = new File(csvFileName);
		  //Instantiating the CSVWriter class
		  CSVWriter writer = new CSVWriter(new FileWriter(file));
	  
		  //Writing data to a csv file
		  String [] header = {"Machine Name", "Machine Tag", "Total Students Used"};
     
		  writer.writeNext(header);
      
		  List<UseRecord> records = useRecordService.getAllUseRecords();
	  
		  //contain machine pk : totalStudents
		  HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
	  
		  for (UseRecord r : records) {
		  
			  int machine_pk = r.getMachineMachinePk();
		 
			  if(map.get(machine_pk) != null) //machine pk already in the map
				  map.put(r.getMachineMachinePk(), map.get(machine_pk) + 1);
			  else 
				  map.put(r.getMachineMachinePk(), 1);
		  } 
	  
		  for (Entry<Integer, Integer> mapElement : map.entrySet()) { 
			  
			  Machine machine = machineService.getMachine(mapElement.getKey()); 
		  
			  String name = machine.getMachineName();
			  String tag = machine.getMachineTag();
			  Integer totalStudents = mapElement.getValue();
		  
			  String [] line = {name, tag, Integer.toString(totalStudents)};
			  writer.writeNext(line);
		  }
		  writer.close();
		  
		  return ResponseEntity.ok()
				 .header("Content-Disposition", "attachment; filename=log.csv")
				 .contentLength(file.length())
				 .contentType(MediaType.parseMediaType("text/csv"))
				 .body(new FileSystemResource(file));
				 
	  }
	  catch (Exception e) {
		  throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to generate report", e);
	  }
  }
  
  @PostMapping("/use-records/{studentPk}/login")
  public ResponseEntity<?> loginStudentToMachines(@PathVariable Integer studentPk,
		  										@RequestBody Machine[] machineList) {
	  try {
		  useRecordService.loginStudent(studentPk, machineList);
		  return new ResponseEntity<>(HttpStatus.OK);
	  }
	  catch (NoSuchElementException e) {
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);  
	  }
  	}
  
  @PostMapping("/use-records/{netId}/logout")
  public ResponseEntity<?> logoutStudentFromMachines(@PathVariable String netId) {
	  try {
		  useRecordService.logoutStudent(netId);
		  return new ResponseEntity<>(HttpStatus.OK);
	  }
	  catch (NoSuchElementException e) {
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);  
	  }
  	}
}
