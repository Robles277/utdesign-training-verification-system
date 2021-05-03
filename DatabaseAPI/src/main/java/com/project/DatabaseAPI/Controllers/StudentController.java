package com.project.DatabaseAPI.Controllers;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;
import java.util.NoSuchElementException;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.project.DatabaseAPI.Repositories.StudentRepository;
import com.project.DatabaseAPI.Services.StudentService;
import com.project.DatabaseAPI.Entities.*;

@RestController
@RequestMapping(path = "/api")
public class StudentController {

  @Autowired
  private StudentRepository studentRepository; // do we need this in the controller?


  @Autowired
  private StudentService studentService;

  @GetMapping(path="/students")
  public List<Student> listStudents() {
	  return studentService.getAllStudents();
  }

  @GetMapping("/students/{netId}")
  public ResponseEntity<Student> findStudent(@PathVariable String netId) {
	  try {
		  Student student = studentService.findStudent(netId);
		  return new ResponseEntity<Student>(student, HttpStatus.OK);
	  }
	  catch(NoSuchElementException e) {
		  return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
	  }
  }

  @PostMapping("/students")
  public int addStudent(@RequestBody Student student) {
	studentService.addStudent(student);
    return student.getStudentPk();
  }

  @PutMapping("/students/{id}")
  public ResponseEntity<?> updateStudent(@RequestBody Student student,
		  					@PathVariable Integer id) {
	  try {
		  studentService.updateStudent(id, student);
		  return new ResponseEntity<>(HttpStatus.OK);
	  }
	  catch (NoSuchElementException e) {
		  return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  }
  }

  @DeleteMapping("/students/{id}")
  public void deleteStudent(@PathVariable Integer id) {
      studentService.deleteStudent(id);
  }
  
  @PostMapping("/students/uploadStudentCSV")
  public ResponseEntity<?> uploadCSV(@RequestParam("file") MultipartFile file) {
	  
	  try {
		  BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"));
		  CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
		  // parse the csv and add each student
		  for (CSVRecord csvRecord : csvParser) {
			  
			  Student student = new Student(
					  csvRecord.get("Student Id"),
					  csvRecord.get("NetId"),
					  csvRecord.get("First Name"),
					  csvRecord.get("Last Name"),
					  Short.parseShort(csvRecord.get("Training Level")),
					  csvRecord.get("Identifier"));
			  
			  try {
				studentService.addStudent(student);
			  }
	    		catch(Exception e ){
			  		continue;
			  }
		  }
		  csvParser.close();
		  return new ResponseEntity<>(HttpStatus.OK);
		  }
	  catch (Exception e) {
		  throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to upload file", e);
	  }
  }
}