package com.project.DatabaseAPI;

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

@RestController 
public class ProductController {
  
  @Autowired
  private PlayerRepository playerRepository;
  
  
  @Autowired
  private PlayerService service;
  
  @GetMapping(path="/list")
  public List<Player> list() {
	  return service.listAll();
  }
  
  @GetMapping("/players/{id}")
  public ResponseEntity<Player> get(@PathVariable int id) {
	  try {
		  Player player =  service.get(id);
		  return new ResponseEntity<Player>(player, HttpStatus.OK);
	  } catch(NoSuchElementException e) {
		  return new ResponseEntity<Player>(HttpStatus.NOT_FOUND);
	  }
  }
  
  @PostMapping("/players")
  public void add(@RequestBody Player player) {
	  service.save(player);
  }
  
  @PutMapping("/players/{id}") 
  public ResponseEntity<?> update(@RequestBody Player player,
		  					@PathVariable Integer id) {
	  try {
		  Player existPlayer = service.get(id);
//		  player.setId(id);
		  service.save(player);
		  return new ResponseEntity<>(HttpStatus.OK);
	  } catch (NoSuchElementException e) {
		  return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  }
  }
  
  @DeleteMapping("/players/{id}")
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