package com.project.DatabaseAPI.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.DatabaseAPI.Repositories.UseRecordRepository;
import com.project.DatabaseAPI.Entities.*;

@Service
public class UseRecordService {

	@Autowired
	private UseRecordRepository useRecordRepository;

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
}
