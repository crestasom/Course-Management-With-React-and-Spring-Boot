package com.crestasom.lecturercoursedemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.crestasom.lecturercoursedemo.model.User;
import com.crestasom.lecturercoursedemo.repo.UserRepo;
import com.crestasom.lecturercoursedemo.security.AuthRequest;

@Service
public class UserService {
	@Autowired
	UserRepo repo;
	@Autowired
	PasswordEncoder encoder;

	public User findByUserName(String userName, String password) {
		Optional<User> user = repo.findByUsername(userName);
		if (user.isPresent() && encoder.matches(password, user.get().getPassword())) {
			return user.get();
		} else {
			return null;
		}
	}

	public User findByUserName(String userName) {
		Optional<User> user = repo.findByUsername(userName);
		if (user.isPresent())
			return user.get();
		else
			return null;

	}

	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	public User save(User user) {
		// TODO Auto-generated method stub
		Optional<User> tempUser = repo.findById(user.getId());
		// check the admin value of user for insert
		if (tempUser.isPresent()) {
			user.setAdmin(tempUser.get().isAdmin());
		}
		// check if the use exists previously
		tempUser = repo.findByUsername(user.getUsername());
		if (tempUser.isPresent() && tempUser.get().getId() != user.getId()) {
			return null;
		}
		user.setPassword(encoder.encode(user.getPassword()));
		return repo.save(user);
	}

	public User getUserById(int id) {
		// TODO Auto-generated method stub
		return repo.findById(id).get();
	}

	public boolean checkPassword(AuthRequest authRequest) {
		User user = findByUserName(authRequest.getUsername());
		System.out.println(authRequest.getPassword());
		System.out.println(encoder.matches(authRequest.getPassword(), user.getPassword()));
		if (user != null && encoder.matches(authRequest.getPassword(), user.getPassword())) {
			return true;
		}
		return false;
	}

	public boolean delete(int id) {
		Optional<User> user = repo.findById(id);
		if (user.isPresent() && !user.get().isAdmin()) {
			repo.deleteById(id);
			return true;
		}
		return false;
	}

}
