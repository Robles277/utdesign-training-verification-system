package com.project.DatabaseAPI.Repositories;

import java.util.List;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.project.DatabaseAPI.Entities.*;

@EnableJpaRepositories
@EntityScan(basePackages = "com.project.DatabaseAPI.Entities")
public interface UseRecordRepository extends JpaRepository<UseRecord, Integer> {
	
	// could not get this to work for the life of me
	@Query(value="SELECT * FROM use_record WHERE use_record.student_student_pk = ?1 AND use_record.date_of_sign_out IS NULL", nativeQuery=true)
	public List<UseRecord> findAllOpenUseRecordsWithStudent(int studentPk);
}
