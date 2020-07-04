package com.crestasom.lecturercoursedemo.model;

import org.springframework.security.core.userdetails.UserDetails;

public abstract class BaseUser implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

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

}
