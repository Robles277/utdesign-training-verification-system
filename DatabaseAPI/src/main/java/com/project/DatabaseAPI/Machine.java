package com.project.DatabaseAPI;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "Machine")
@EntityListeners(AuditingEntityListener.class)
public class Machine {

	private int machinePk; // auto-increment
	
	private String machineTag;
	private String machineName;

	public Machine() {	
	}
	
	public Machine(String machineTag, String machineName) {
		this.machineTag = machineTag;
		this.machineName = machineName;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getMachinePk() {
		return machinePk;
	}

	public void setMachinePk(int machinePk) {
		this.machinePk = machinePk;
	}
	public void setMachineTag(String machineTag) {
		this.machineTag = machineTag;
	}

	public String getMachineTag() {
		return machineTag;
	}
	public String getMachineName() {
		return machineName;
	}

	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}

}
