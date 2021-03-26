package com.project.DatabaseAPI.Entities;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "machine")
@EntityListeners(AuditingEntityListener.class)
public class Machine {

	private int machine_pk; // auto-increment
	
	private String machine_tag;
	private String machine_name;

	public Machine() {	
	}
	
	public Machine(String machineTag, String machineName) {
		this.machine_tag = machineTag;
		this.machine_name = machineName;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getMachinePk() {
		return machine_pk;
	}

	public void setMachinePk(int machinePk) {
		this.machine_pk = machinePk;
	}
	public void setMachineTag(String machineTag) {
		this.machine_tag = machineTag;
	}

	public String getMachineTag() {
		return machine_tag;
	}
	public String getMachineName() {
		return machine_name;
	}

	public void setMachineName(String machineName) {
		this.machine_name = machineName;
	}

}
