package com.project.DatabaseAPI.Services;

import java.util.List;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.DatabaseAPI.Repositories.StudentRepository;
import com.project.DatabaseAPI.Repositories.UseRecordRepository;
import com.project.DatabaseAPI.Entities.*;

@Service
public class UseRecordService {

	@Autowired
	private UseRecordRepository useRecordRepository;
	
	@Autowired 
	private StudentRepository studentRepository;

	public List<UseRecord> getAllUseRecords() {
		return useRecordRepository.findAll();
	}

  public UseRecord getUseRecord(Integer id) {
    return useRecordRepository.findById(id).get();
  }

	public void addUseRecord(UseRecord useRecord) {
		useRecordRepository.save(useRecord);
	}

  public void updateUseRecord(Integer id, UseRecord updatedUseRecord) {
    UseRecord existingUseRecord = getUseRecord(id);
    if (existingUseRecord != null) {
    	useRecordRepository.save(updatedUseRecord);
    }
  }

	public void deleteUseRecord(Integer id) {
		useRecordRepository.deleteById(id);
	}
	
	public void loginStudent(Integer studentPk, Machine[] machineList) {
		for (Machine machine : machineList) {
			UseRecord newRecord = new UseRecord();
			newRecord.setDateOfSignIn(new Date());
			newRecord.setMachineMachinePk(machine.getMachinePk());
			newRecord.setStudentStudentPk(studentPk);
			useRecordRepository.save(newRecord);
		}
	}
	
	public void logoutStudent(String netId) {
		Student currentStudent = studentRepository.findByNetId(netId);
		int currentPk = currentStudent.getStudentPk();
		// really bad to pull in all, but it works
		List<UseRecord> openRecords = useRecordRepository.findAll();
		for (UseRecord openRecord : openRecords) {
			if (openRecord.getStudentStudentPk() != currentPk || openRecord.getDateOfSignOut() != null) {
				continue;
			}
			openRecord.setDateOfSignOut(new Date());
		 	useRecordRepository.save(openRecord);
		}
	}
}
