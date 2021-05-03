package com.project.DatabaseAPI.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.DatabaseAPI.Repositories.MachineRepository;
import com.project.DatabaseAPI.Entities.*;

@Service
public class MachineService {

	@Autowired
	private MachineRepository machineRepository;

	public List<Machine> getAllMachines() {
		return machineRepository.findAll();
	}

	public Machine getMachine(Integer id) {
		return machineRepository.findById(id).get();
	}

	public void addMachine(Machine machine) {
		machineRepository.save(machine);
	}

  public void updateMachine(Integer id, Machine updatedMachine) {
    Machine existingMachine = getMachine(id);
    if (existingMachine != null) {
    	machineRepository.save(updatedMachine);
    }
  }

	public void deleteMachine(Integer id) {
		machineRepository.deleteById(id);
	}
}
