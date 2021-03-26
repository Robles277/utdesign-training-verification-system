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

import com.project.DatabaseAPI.Repositories.StudentRepository;
import com.project.DatabaseAPI.Services.StudentService;
import com.project.DatabaseAPI.Entities.*;

@RestController 
public class StudentController {
  
  @Autowired
  private StudentRepository studentRepository;
  
  
  @Autowired
  private StudentService service;
  
  @GetMapping(path="/list")
  public List<Student> list() {
	  return service.listAll();
  }
  
  @GetMapping("/student/{id}")
  public ResponseEntity<Student> get(@PathVariable int id) {
	  try {
		  Student player =  service.get(id);
		  return new ResponseEntity<Student>(player, HttpStatus.OK);
	  } catch(NoSuchElementException e) {
		  return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
	  }
  }
  
  @PostMapping("/student")
  public void add(@RequestBody Student student) {
	  service.save(student);
  }
  
  @PutMapping("/student/{id}") 
  public ResponseEntity<?> update(@RequestBody Student student,
		  					@PathVariable Integer id) {
	  try {
		  Student existPlayer = service.get(id);
		  service.save(student);
		  return new ResponseEntity<>(HttpStatus.OK);
	  } catch (NoSuchElementException e) {
		  return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  }
  }
  
  @DeleteMapping("/student/{id}")
  public void delete(@PathVariable Integer id) {
      service.delete(id);
  }

}
//  @PostMapping(path="/addPlayer")
//  public @ResponseBody String addNewUser (@RequestParam String name) {
//    Player n = new Player();
//    n.setFirstName(name);
//    playerRepository.save(n);
//    return "Saved";
//  }
//
//  
//  // Returns a JSON or XML with the users
//  @GetMapping(path="/all")
//  public @ResponseBody Iterable<Player> getAllPlayers() {
//   
//    return playerRepository.findAll();
//  }
//}