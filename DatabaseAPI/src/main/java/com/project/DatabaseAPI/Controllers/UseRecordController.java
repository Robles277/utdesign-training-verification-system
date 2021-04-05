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

import com.project.DatabaseAPI.Repositories.UseRecordRepository;
import com.project.DatabaseAPI.Services.UseRecordService;
import com.project.DatabaseAPI.Entities.*;

@RestController
@RequestMapping(path = "/api")
public class UseRecordController {

  @Autowired
  private UseRecordRepository appointmentRepository; // do we need this in the controller?


  @Autowired
  private UseRecordService useRecordService;

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
}
