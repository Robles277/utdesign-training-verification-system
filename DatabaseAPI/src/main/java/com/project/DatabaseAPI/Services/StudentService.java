package com.project.DatabaseAPI.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.DatabaseAPI.Repositories.StudentRepository;
import java.util.List;
import com.project.DatabaseAPI.Entities.*;
@Service
public class StudentService {
	
	@Autowired
	private StudentRepository repo;
	
	public List<Student> listAll() {
		return repo.findAll();
	}
	
	public void save(Student student) {
		repo.save(student);
	}
	
	public Student get(Integer id) {
		return repo.findById(id).get();
	}
	
	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
