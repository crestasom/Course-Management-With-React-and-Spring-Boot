package com.crestasom.lecturercoursedemo.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "user")
@NoArgsConstructor
@ToString
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	protected String username;
	protected String password;
	private boolean isAdmin;
	private String email;
	private String role;

	public User(String username, String password, String email, boolean isAdmin, String role) {
		this.username = username;
		this.password = password;
		this.isAdmin = isAdmin;
		this.email = email;
		this.role = role;
	}

	public User(int id, String username, String password, String email, boolean isAdmin, String role) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.isAdmin = isAdmin;
		this.role = role;
	}

	public int getId() {
		return id;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}

	public void setId(int id) {
		this.id = id;
	}

	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		List<GrantedAuthority> authList = new ArrayList<>();
		authList.add(new SimpleGrantedAuthority(role));
		return authList;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	
	

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
