package com.crestasom.lecturercoursedemo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Instructor {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column(name = "user_name")
	private String userName;
	@Column(name = "name")
	private String name;

	public Instructor(String userName, String name) {
		super();
		this.userName = userName;
		this.name = name;
	}

}
