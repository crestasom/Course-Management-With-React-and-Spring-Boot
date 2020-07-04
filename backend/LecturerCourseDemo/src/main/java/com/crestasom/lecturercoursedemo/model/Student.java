package com.crestasom.lecturercoursedemo.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@Table(name = "student")
@EqualsAndHashCode(callSuper = false)
public class Student {
	/**
	 * 
	 */

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private int id;
	private String name;
	private String rollNo;
	@ManyToOne
	private Semester semester;
	@OneToOne
	User user;

	public Student(String name, String rollno, String username, String password, String email) {
		setUser(new User(username, password, email, false,"ROLE_STUDENT"));
		this.name = name;
		this.rollNo = rollno;

	}

}
