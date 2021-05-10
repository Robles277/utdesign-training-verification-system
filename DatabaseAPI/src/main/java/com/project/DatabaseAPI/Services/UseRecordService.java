package com.project.DatabaseAPI.Services;

import java.util.List;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.DatabaseAPI.Repositories.StudentRepository;
import com.project.DatabaseAPI.Repositories.UseRecordRepository;
import com.project.DatabaseAPI.Entities.*;
import com.project.DatabaseAPI.Exceptions.StudentAlreadySignedInException;

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

	public void loginStudent(Integer studentPk, Machine[] machineList) throws StudentAlreadySignedInException {
		List<UseRecord> openRecords = getOpenRecords(studentPk);
		if (openRecords.size() > 0) {
			throw new StudentAlreadySignedInException("Student is already logged in.");
		}
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
		List<UseRecord> openRecords = getOpenRecords((Integer)currentPk);
		for (UseRecord openRecord : openRecords) {
			openRecord.setDateOfSignOut(new Date());
		 	useRecordRepository.save(openRecord);
		}
	}

	private List<UseRecord> getOpenRecords(Integer studentPk) {
		// really bad to pull in all records, but it works (as compared to the SQL I was trying to make work)
		List<UseRecord> allRecords = useRecordRepository.findAll();
		ArrayList<UseRecord> openRecordsForStudent = new ArrayList<UseRecord>();
		for (UseRecord record : allRecords) {
			if (record.getDateOfSignOut() == null && record.getStudentStudentPk() == studentPk) {
				openRecordsForStudent.add(record);
			}
		}
		return openRecordsForStudent;
	}
}