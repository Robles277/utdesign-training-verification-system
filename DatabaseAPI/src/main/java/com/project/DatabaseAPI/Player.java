package com.project.DatabaseAPI;

//Autumn will make new classes
//this is autumn

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "player")
@EntityListeners(AuditingEntityListener.class)
public class Player {

	private int id;
	

	private String name;
	private int points;
	private int rebounds;
	private int assists;

	public Player() {
	}

	public Player(int id, String name, int points, int rebounds, int assists) {
		this.id = id;
		this.name = name;
		this.points = points;
		this.rebounds = rebounds;
		this.assists = assists;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setPoints(int x) {
		this.points = x;
	}

	public int getPoints() {
		return points;
	}

	public void addPoints(int x) {
		points += x;
	}

	public void setRebounds(int x) {
		this.rebounds = x;
	}

	public int getRebounds() {
		return rebounds;
	}

	public void addRebounds(int x) {
		rebounds += x;
	}

	public void setAssists(int x) {
		this.assists = x;
	}

	public int getAssists() {
		return assists;
	}

	public void addAssists(int x) {
		assists += x;
	}
}
