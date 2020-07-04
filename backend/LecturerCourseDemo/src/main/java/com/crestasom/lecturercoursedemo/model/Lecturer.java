package com.crestasom.lecturercoursedemo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "instructor")
public class Lecturer {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column(name = "name")
	private String name;
	private String qualification;
	@OneToOne
	User user;

	public Lecturer(String username, String password, String email, String qualification, String name) {
		setUser(new User(username, password, email, false, "ROLE_LECTURER"));
		this.name = name;
		this.qualification = qualification;
	}

}
