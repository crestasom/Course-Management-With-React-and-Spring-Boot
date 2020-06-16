package com.crestasom.lecturercoursedemo.model;

import java.util.ArrayList;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "user")
public class User extends org.springframework.security.core.userdetails.User {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String userName;
	private String password;
	private boolean isAdmin;

	public User(String username, String password, String userName2, String password2, boolean isAdmin) {
		super(username, password, new ArrayList<>());
		userName = userName2;
		password = password2;
		this.isAdmin = isAdmin;
	}

	public User(String username, String password, int id, String userName2, String password2, boolean isAdmin) {
		super(username, password, new ArrayList<>());
		this.id = id;
		userName = userName2;
		password = password2;
		this.isAdmin = isAdmin;
	}

}
