package com.project.DatabaseAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
	
	@Autowired
	private PlayerRepository repo;
	
	public List<Player> listAll() {
		return repo.findAll();
	}
	
	public void save(Player player) {
		repo.save(player);
	}
	
	public Player get(Integer id) {
		return repo.findById(id).get();
	}
	
	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
